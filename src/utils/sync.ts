import axios from "axios";
import { AppDataSource } from "../db";
import { Departments } from "../entities/Departments";
import { Cities } from "../entities/Cities";

// Sincronizar departamentos
export const syncDepartments = async () => {
  const departmentRepository = AppDataSource.getRepository(Departments);
  const cityRepository = AppDataSource.getRepository(Cities);

  try {
    // Obtener departamentos de la API de Colombia
    const response = await axios.get(
      "https://api-colombia.com/api/v1/Department"
    );
    const departments = response.data;

    // Mapeo de IDs de la API a los IDs de la base de datos
    const departmentMapping: { [key: number]: number } = {};

    // Insertar o actualizar departamentos
    for (const dept of departments) {
      let department = await departmentRepository.findOne({
        where: { name: dept.name },
      });

      if (!department) {
        department = new Departments();
        department.name = dept.name;
        await departmentRepository.save(department);
      }

      departmentMapping[dept.id] = department.id; // Guardar el mapeo de IDs
    }

    console.log("Departamentos sincronizados correctamente");
    return departmentMapping;
  } catch (error) {
    console.error("Error al sincronizar departamentos:", error);
    throw error;
  }
};

// Sincronizar ciudades
export const syncCities = async (departmentMapping: {
  [key: number]: number;
}) => {
  const cityRepository = AppDataSource.getRepository(Cities);

  try {
    // Recorrer el mapeo de departamentos
    for (const [apiDeptId, dbDeptId] of Object.entries(departmentMapping)) {
      // Obtener ciudades de la API de Colombia
      const response = await axios.get(
        `https://api-colombia.com/api/v1/Department/${apiDeptId}/cities`
      );
      const cities = response.data;

      // Insertar o actualizar ciudades
      for (const city of cities) {
        let existingCity = await cityRepository.findOne({
          where: { name: city.name, department: { id: dbDeptId } },
        });

        if (!existingCity) {
          const newCity = new Cities();
          newCity.name = city.name;
          newCity.department = { id: dbDeptId } as Departments; // Asignar el departamento
          await cityRepository.save(newCity);
        }
      }
    }

    console.log("Ciudades sincronizadas correctamente");
  } catch (error) {
    console.error("Error al sincronizar ciudades:", error);
    throw error;
  }
};

// Sincronizar todo
export const syncAll = async () => {
  try {
    const departmentMapping = await syncDepartments();
    await syncCities(departmentMapping);
    console.log("Sincronización completada");
  } catch (error) {
    console.error("Error en la sincronización:", error);
  }
};

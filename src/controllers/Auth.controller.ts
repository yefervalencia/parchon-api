import { RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, COOKIE_SECRET_KEY } from "../config";
import { Admins } from "../entities/Admins";
import { Owners } from "../entities/Owners";
import { Users } from "../entities/Users";
import { Roles } from "../entities/Roles";
import { hashPassword, verifyPassword } from "../utils/encryption";
import TokenUtils from "../utils/token";

export const register: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { roleId } = req.body;

    if (![1, 2, 3].includes(roleId)) {
      res.status(400).json({ message: "Invalid role ID" });
      return;
    }

    const role = await Roles.findOneBy({ id: roleId });
    if (!role) {
      res.status(400).json({ message: "Role not found" });
      return;
    }

    let newUser;
    let tokenPayload;

    switch (roleId) {
      case 1:
        const {
          name,
          lastName,
          email,
          password,
          cellphone,
          birthDate,
          cityId,
        } = req.body;





        const emailExists = await Users.findOne({
          where: { email: email.toLowerCase().trim() },
        });
        if (emailExists) {
          res.status(400).json({ 
            message: "El email ya está registrado",
            errorCode: "EMAIL_ALREADY_EXISTS" // Código de error específico
          });
        }

        const user = new Users();
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.password = hashPassword(password);
        user.cellphone = cellphone;
        user.birthDate = birthDate;
        user.cityId = cityId;
        user.roleId = roleId;

        await user.save();
        newUser = user;

        tokenPayload = {
          id: user.id,
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          role: user.roleId,
        };
        break;

      case 2:
        const {
          name: ownerName,
          lastName: ownerLastName,
          cellphone: ownerCellphone,
          identification,
          email: ownerEmail,
          password: ownerPassword,
        } = req.body;

        const emailExistsOwner = await Owners.findOne({
          where: { email: ownerEmail.toLowerCase().trim() },
        });
        if (emailExistsOwner) {
          res.status(400).json({ message: "El email ya está registrado" });
          return; // Agrega el return aquí para detener la ejecución
        }
        
        const owner = new Owners();
        owner.name = ownerName;
        owner.lastName = ownerLastName;
        owner.cellphone = ownerCellphone;
        owner.identification = identification;
        owner.email = ownerEmail;
        owner.password = hashPassword(ownerPassword);
        owner.roleId = roleId;

        await owner.save();
        newUser = owner;

        tokenPayload = {
          id: owner.id,
          email: owner.email,
          name: owner.name,
          lastName: owner.lastName,
          role: owner.roleId,
        };
        break;

      case 3:
        const {
          name: adminName,
          email: adminEmail,
          password: adminPassword,
        } = req.body;

        const admin = new Admins();
        admin.name = adminName;
        admin.email = adminEmail;
        admin.password = hashPassword(adminPassword);
        admin.roleId = roleId;

        await admin.save();
        newUser = admin;

        tokenPayload = {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.roleId,
        };
        break;

      default:
        res.status(400).json({ message: "Invalid role ID" });
        return;
    }

    const token = jwt.sign(tokenPayload, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie(COOKIE_SECRET_KEY, token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600000 * 24,
      secure: false, //process.env.NODE_ENV === "production",
    });

    res.status(201).json(newUser);
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Unknown error occurred" });
    return;
  }
};

// Login genérico para todos los tipos de usuarios
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      res.status(400).json({
        errorCode: "MISSING_CREDENTIALS",
        message: "Email y contraseña son requeridos"
      });
      return;
    }

    // Búsqueda segura de usuario
    const user = await findUserByEmail(email);
    if (!user || !verifyPassword(password, user.password)) {
      res.status(401).json({
        errorCode: "INVALID_CREDENTIALS",
        message: "Credenciales inválidas"
      });
      return;
    }

    const { token, userResponse } = await generateAuthResponse(user);

    setAuthCookie(res, token);

    res.status(200).json({
      message: "Login exitoso",
      user: userResponse,
      token
    });
    return;

  } catch (error) {
    next(error); 
  }
};

const findUserByEmail = async (email: string) => {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    
    const user = await Users.findOne({
      where: { email: normalizedEmail },
      relations: ["role"],
      select: ["id", "name", "lastName", "email", "password"]
    });

    return user || await Owners.findOne({
      where: { email: normalizedEmail },
      relations: ["role"],
      select: ["id", "name", "lastName", "email", "password"]
    }) || await Admins.findOne({
      where: { email: normalizedEmail },
      relations: ["role"],
      select: ["id", "name", "email", "password"]
    });
  } catch (error) {
    console.error("Error en búsqueda de usuario:", error);
    return null;
  }
};

const generateAuthResponse = async (user: Users | Owners | Admins) => {
  const tokenPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    ...(user instanceof Users || user instanceof Owners ? { lastName: user.lastName } : {}),
    role: user.role?.name || 
          (user instanceof Users ? 'user' : 
           user instanceof Owners ? 'owner' : 'admin')
  };

  const token = jwt.sign(tokenPayload, JWT_SECRET_KEY, { expiresIn: "1d" });
  const { password, ...userResponse } = user;

  return { token, userResponse };
};

const setAuthCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_SECRET_KEY, token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3600000 * 24,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};






// Logout genérico
export const logout: RequestHandler = (req, res) => {
  try{ 
  res
    .clearCookie(COOKIE_SECRET_KEY, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path:"/"
    })
    .status(200)
    .json({ message: "Logged out successfully" });
  }catch (err){
    res.status(500).json({ message: "Error al cerrar sesion" });
  }
};

// Obtener usuario actual mediante cookie
export const getCurrentUser: RequestHandler = async (req, res) => {
  try {
    const userId = TokenUtils.getUserIdFromRequest(req);
    const role = TokenUtils.getRoleFromRequest(req);

    // Validación más estricta
    if (!userId || !role) {
       res.status(401).json({ 
        message: "No autorizado - Token inválido o faltante",
        errorCode: "INVALID_TOKEN"
      });
      return;
    }

    // Validar que el role sea uno de los permitidos
    const validRoles = ['user', 'owner', 'admin'];
    if (!validRoles.includes(role.toLowerCase())) {
       res.status(400).json({ 
        message: "Tipo de rol inválido",
        errorCode: "INVALID_ROLE"
      });
      return;
    }

    let user;
    try {
      switch (role.toLowerCase()) {
        case "user":
          user = await Users.findOne({
            where: { id: userId },
            relations: ["city", "role"], 
            select: ["id", "name", "lastName", "email", "cellphone", "birthDate"] 
          });
          break;
        case "owner":
          user = await Owners.findOne({
            where: { id: userId },
            relations: ["role"],
            select: ["id", "name", "lastName", "email", "cellphone", "identification"]
          });
          break;
        case "admin":
          user = await Admins.findOne({
            where: { id: userId },
            relations: ["role"],
            select: ["id", "name", "email"]
          });
          break;
      }

      if (!user) {
         res.status(404).json({ 
          message: "Usuario no encontrado",
          errorCode: "USER_NOT_FOUND"
        });
        return;

      }

      const { password, ...safeUserData } = user;

       res.status(200).json(safeUserData);

    } catch (dbError) {
      console.error("Error en consulta a la base de datos:", dbError);
       res.status(500).json({ 
        message: "Error al obtener informacion del usuario",
        errorCode: "DB_ERROR"
      });
    }

  } catch (err) {
    console.error("Error en getCurrentUser:", err);
     res.status(500).json({ 
      message: "Error interno del servidor",
      errorCode: "SERVER_ERROR"
    });
  }
};

// Verificar si existe cookie de sesión
export const checkAuth: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies[COOKIE_SECRET_KEY];

    if (!token) {
      res.status(200).json({ 
        isAuthenticated: false,
        message: "No autenticado - Token faltante"
      });
      return;
    }


    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: number };
      const isAuthenticated = !!decoded?.id;
      
      res.status(200).json({ 
        isAuthenticated,
        userId: decoded.id 
      });
      return;

    } catch (jwtError) {
      res.status(200).json({
        isAuthenticated: false,
        message: "Token inválido o expirado"
      });
      return;
    }

  } catch (err) {
    console.error("Error en checkAuth:", err);
    res.status(200).json({
      isAuthenticated: false,
      message: "Error verificando autenticación"
    });
    return;
  }
};

// Obtener rol del usuario actual
export const getCurrentRole: RequestHandler = async (req, res) => {
  try {
    const role = TokenUtils.getRoleFromRequest(req);

    if (!role) {
      res.status(401).json({ message: "No token provided" });
    }

    res.json({ role });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
    res.status(500).json({ message: "Unknown error occurred" });
  }
};


export const updateProfile: RequestHandler = async (req, res) => {
  try {
    // Extraer el ID del usuario y su rol a partir del token
    const userId = TokenUtils.getUserIdFromRequest(req);
    const role = TokenUtils.getRoleFromRequest(req);

    if (!userId || !role) {
      res.status(401).json({ 
        message: "No autorizado - Token inválido o faltante", 
        errorCode: "INVALID_TOKEN" 
      });
      return;
    }

    let user;

    switch (role.toLowerCase()) {
      case "user": {
        user = await Users.findOne({ where: { id: userId } });
        if (!user) {
          res.status(404).json({
            message: "Usuario no encontrado",
            errorCode: "USER_NOT_FOUND",
          });
          return;
        }

        // Extraer campos enviados en el body (excluyendo contraseña)
        const { name, lastName, cellphone, birthDate, cityId, email } = req.body;
        
        if (name) user.name = name;
        if (lastName) user.lastName = lastName;
        if (cellphone) user.cellphone = cellphone;
        if (birthDate) user.birthDate = birthDate;
        if (cityId) user.cityId = cityId;
        if (email && email.toLowerCase().trim() !== user.email.toLowerCase().trim()) {
          // Validar que el nuevo email no esté registrado
          const emailExists = await Users.findOne({
            where: { email: email.toLowerCase().trim() },
          });
          if (emailExists) {
            res.status(400).json({
              message: "El email ya está registrado",
              errorCode: "EMAIL_ALREADY_EXISTS",
            });
            return;
          }
          user.email = email;
        }

        await user.save();
        res.status(200).json({ message: "Perfil actualizado exitosamente", user });
        break;
      }
      case "owner": {
        user = await Owners.findOne({ where: { id: userId } });
        if (!user) {
          res.status(404).json({
            message: "Usuario no encontrado",
            errorCode: "USER_NOT_FOUND",
          });
          return;
        }

        // Extraer campos enviados en el body (excluyendo contraseña)
        const {
          name: ownerName,
          lastName: ownerLastName,
          cellphone: ownerCellphone,
          identification,
          email: ownerEmail,
        } = req.body;
        
        if (ownerName) user.name = ownerName;
        if (ownerLastName) user.lastName = ownerLastName;
        if (ownerCellphone) user.cellphone = ownerCellphone;
        if (identification) user.identification = identification;
        if (ownerEmail && ownerEmail.toLowerCase().trim() !== user.email.toLowerCase().trim()) {
          const emailExists = await Owners.findOne({
            where: { email: ownerEmail.toLowerCase().trim() },
          });
          if (emailExists) {
            res.status(400).json({
              message: "El email ya está registrado",
              errorCode: "EMAIL_ALREADY_EXISTS",
            });
            return;
          }
          user.email = ownerEmail;
        }

        await user.save();
        res.status(200).json({ message: "Perfil actualizado exitosamente", user });
        break;
      }
      case "admin": {
        user = await Admins.findOne({ where: { id: userId } });
        if (!user) {
          res.status(404).json({
            message: "Usuario no encontrado",
            errorCode: "USER_NOT_FOUND",
          });
          return;
        }

        // Extraer campos enviados en el body (excluyendo contraseña)
        const { name: adminName, email: adminEmail } = req.body;
        
        if (adminName) user.name = adminName;
        if (adminEmail && adminEmail.toLowerCase().trim() !== user.email.toLowerCase().trim()) {
          const emailExists = await Admins.findOne({
            where: { email: adminEmail.toLowerCase().trim() },
          });
          if (emailExists) {
            res.status(400).json({
              message: "El email ya está registrado",
              errorCode: "EMAIL_ALREADY_EXISTS",
            });
            return;
          }
          user.email = adminEmail;
        }

        await user.save();
        res.status(200).json({ message: "Perfil actualizado exitosamente", user });
        break;
      }
      default: {
        res.status(400).json({ 
          message: "Tipo de rol inválido", 
          errorCode: "INVALID_ROLE" 
        });
        return;
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};



export const changePassword: RequestHandler = async (req, res) => {
  try {
    const userId = TokenUtils.getUserIdFromRequest(req);
    const role = TokenUtils.getRoleFromRequest(req);

    if (!userId || !role) {
      res.status(401).json({
        message: "Unauthorized - Invalid or missing token",
        errorCode: "INVALID_TOKEN"
      });
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      res.status(400).json({
        message: "All fields are required",
        errorCode: "MISSING_FIELDS"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      res.status(400).json({
        message: "New password and confirmation do not match",
        errorCode: "PASSWORD_MISMATCH"
      });
      return;
    }

    let user;

    switch (role.toLowerCase()) {
      case "user":
        user = await Users.findOne({ where: { id: userId } });
        break;
      case "owner":
        user = await Owners.findOne({ where: { id: userId } });
        break;
      case "admin":
        user = await Admins.findOne({ where: { id: userId } });
        break;
      default:
        res.status(400).json({ message: "Invalid role", errorCode: "INVALID_ROLE" });
        return;
    }

    if (!user) {
      res.status(404).json({
        message: "User not found",
        errorCode: "USER_NOT_FOUND"
      });
      return;
    }

    const isPasswordValid = verifyPassword(currentPassword, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Current password is incorrect",
        errorCode: "INVALID_CURRENT_PASSWORD"
      });
      return;
    }

    user.password = hashPassword(newPassword);
    await user.save();

    res.status(200).json({
      message: "Password changed successfully"
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      message: "Internal server error",
      errorCode: "SERVER_ERROR"
    });
  }
};


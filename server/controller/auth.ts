const PetOwner = require("../models/PetOwnerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// @desc Create new pet Owner
// @route POST /auth
// @access Public
export const signUp = async (req, res) => {
  const { email, firstName, lastName, userName, password, avatar, phone } =
    req.body;

  //check all required data
  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check email duplicate
  const duplicate = await PetOwner.findOne({ email });
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  //hash password
  const hashedPwd = await bcrypt.hash(password, 10);

  //create petOwner
  const petOwner = await PetOwner.create({
    email,
    firstName,
    lastName,
    userName,
    password: hashedPwd,
    avatar,
    phone,
  });

  if (petOwner) {
    res.status(201).json({
      _id: petOwner._id,
      firstName: petOwner.firstName,
      lastName: petOwner.lastName,
      userName: petOwner.userName,
      email: petOwner.email,
      avatar: petOwner.avatar,
      phone: petOwner.phone,
      roles: petOwner.roles,
      isActive: petOwner.isActive,
    });
  } else {
    res.status(400).json({ message: "Failing to create the petOwner" });
  }
};

// @desc Login
// @route POST /auth/login
// @access Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  //check all required data
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check email is valid
  const foundPetOwner = await PetOwner.findOne({ email });

  if (!foundPetOwner) {
    return res.status(401).json({ message: "Account not found" });
  }

  if (!foundPetOwner.isActive) {
    return res.status(401).json({ message: "Account not active" });
  }

  const match = await bcrypt.compare(password, foundPetOwner.password);

  if (!match) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessToken = jwt.sign(
    {
      PetOwnerInfo: {
        email: foundPetOwner.email,
        roles: foundPetOwner.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  );

  const refreshToken = jwt.sign(
    {
      PetOwnerInfo: {
        email: foundPetOwner.email,
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  //create cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, //  7d
  });

  res.status(200).json({ accessToken });
};

// @desc refresh
// @route GET /auth/refresh
// @access Public
export const refresh = (req, res) => {
  const cookies = req.cookies;
  console.log("cookies", cookies);
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;
  const verifyCallbackFn: jwt.VerifyCallback = (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "Forbidden" });
    }

    console.log("decoded", decoded);

    // const foundPetOwner = PetOwner.findOne({ email: decoded.email });

    // if (!foundPetOwner) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // const accessToken = jwt.sign(
    //   {
    //     PetOwnerInfo: {
    //       email: foundPetOwner.email,
    //       roles: foundPetOwner.roles,
    //     },
    //   },
    //   env.ACCESS_TOKEN_SECRET,
    //   {
    //     expiresIn: "10s",
    //   }
    // );
    // res.status(200).json({ accessToken });
  };

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, verifyCallbackFn);
};

// @desc Logout
// @route POST /auth/logout
// @access Public
export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json({ message: "Cookie cleared" });
};

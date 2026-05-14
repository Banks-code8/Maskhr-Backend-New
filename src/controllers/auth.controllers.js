// auth.controller.js
import * as authService from "./../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);

    res.cookie("accessToken", data.accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

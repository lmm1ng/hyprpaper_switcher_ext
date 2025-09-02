import { Err } from "@vicinae/api/dist/api/lib/result";
import { exec } from "child_process";
import { readFile } from "fs/promises";
import { HYPRLAND_SIGNATURE_PATH } from "../constants/hyprland";

export const getSignature = async (): Promise<string> => {
  try {
    const signature = await readFile(HYPRLAND_SIGNATURE_PATH, "utf8");
    return signature.trim();
  } catch (e) {
    console.error(e);
    throw new Error("Cannot load Hyprland signature");
  }
};

export const setWallpaper = (path: string, sign: string): void => {
  if (!process.getuid) {
    throw new Error("Cannot get user ID");
  }

  exec(
    `hyprctl hyprpaper unload all && hyprctl hyprpaper preload ${path} && hyprctl hyprpaper wallpaper ", ${path}"`,
    { env: { ...process.env, HYPRLAND_INSTANCE_SIGNATURE: sign } },
  );
};

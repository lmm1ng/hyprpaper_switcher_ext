import React, { useEffect, useState } from "react";
import {
  ActionPanel,
  Action,
  List,
  showToast,
  Icon,
  Toast,
  LocalStorage,
  Detail,
} from "@vicinae/api";
import { LOCAL_STORAGE_WALLPAPER_PATH_KEY } from "./constants/localStorage";
import { getImagesFromPath, Image } from "./utils/image";
import { getSignature, setWallpaper } from "./utils/hyprland";

export default function ListDetail() {
  const [wallpapersPath, setWallpapersPath] = useState<string | null>(null);
  const [wallpapers, setWallpapers] = useState<Image[]>([]);
  const [hyprSignature, setHyprSignature] = useState<string | null>(null);

  useEffect(() => {
    getSignature()
      .then((signature) => {
        setHyprSignature(signature);
      })
      .catch((e) => {
        showToast({
          title: e.message,
          style: Toast.Style.Failure,
        });
      });
    loadPath();
  }, []);

  useEffect(() => {
    if (!wallpapersPath) {
      return;
    }
    getImagesFromPath(wallpapersPath)
      .then((ws) => {
        setWallpapers(ws);
      })
      .catch((e) => {
        showToast({
          title: e.message,
          style: Toast.Style.Failure,
        });
      });
  }, [wallpapersPath]);

  const loadPath = async () => {
    try {
      const path = await LocalStorage.getItem(
        LOCAL_STORAGE_WALLPAPER_PATH_KEY,
      ).catch(() => {
        throw new Error("Cannot get wallpapers path");
      });
      if (!path) {
        throw new Error("No path setted in settings");
      }
      setWallpapersPath(path as string);
    } catch (e) {
      showToast({
        title:
          e instanceof Error
            ? e.message
            : "Error while getting wallpapers path",
        style: Toast.Style.Failure,
      });
    }
  };

  return (
    <List isShowingDetail searchBarPlaceholder={"Search wallpapers..."}>
      <List.Section title={"Wallpapers"}>
        {wallpapers.map((w) => (
          <List.Item
            key={w.name}
            icon={Icon.Image}
            title={w.name}
            detail={
              <List.Item.Detail
                markdown={`![](${w.fullpath})`}
                metadata={
                  <Detail.Metadata>
                    <Detail.Metadata.Label
                      title="Image path"
                      text={w.fullpath}
                    />
                    <Detail.Metadata.Label
                      title="Dimensions"
                      text={`${w.width}x${w.height} px`}
                    />
                    <Detail.Metadata.Label
                      title="File size"
                      text={`${w.size.toFixed(2)} MB`}
                    />
                  </Detail.Metadata>
                }
              />
            }
            actions={
              <ActionPanel>
                <Action
                  title="Set"
                  onAction={() => {
                    if (!hyprSignature) {
                      return;
                    }
                    setWallpaper(w.fullpath, hyprSignature);
                  }}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}

import {
  Action,
  ActionPanel,
  Detail,
  Form,
  LocalStorage,
  showToast,
  Toast,
} from "@vicinae/api";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_WALLPAPER_PATH_KEY } from "./constants/localStorage";

export default function Settings() {
  useEffect(() => {
    LocalStorage.getItem(LOCAL_STORAGE_WALLPAPER_PATH_KEY).then((p) => {
      if (!p) {
        return;
      }
      setPath(String(p));
    });
  }, []);

  const [path, setPath] = useState("");

  const onSubmit = async (v: Form.Values) => {
    if (!v.wallpaper_path) {
      showToast({
        title: "Invalid wallpaper path",
        style: Toast.Style.Failure,
      });
    }

    await LocalStorage.setItem(
      LOCAL_STORAGE_WALLPAPER_PATH_KEY,
      v.wallpaper_path as string,
    );

    setPath(v.wallpaper_path as string);

    showToast({
      title: "Wallpaper path saved",
      style: Toast.Style.Success,
    });
  };
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={onSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="wallpaper_path"
        title="Wallpapers path"
        value={path}
      />
    </Form>
  );
}

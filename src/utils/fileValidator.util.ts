import { promises } from 'fs';

export async function fileHasExist(name: string, path: string) {
  try {
    path = path.replace(/\\/g, '/');
    const fullPath = path + '/' + name;
    const extension = await promises.stat(fullPath);

    return extension.isFile();
  } catch (error) {
    return false;
  }
}
export async function filterFile(_req: any, file: { mimetype: string }) {
  const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    return true;
  } else {
    return false;
  }
}

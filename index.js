import { 
  readdir, 
  readFile,
  rename, 
  writeFile,
} from 'fs/promises';

const inputPath = './data/input/';

const file = {
  read: null,
  write: null,
  rename: null,
};

/**
 * @param {string} fileName - name of the file to read
 * @param {string} [path] - path where the file is located. If not specified, uses the default `./data/`
 * @param {string} [encoding] - if specified returns encoded string, if not returns Buffer
 * @returns {Promise<string|Buffer>} if encoding is specified, returns string, else returns Buffer
 * @throws Throws error if there is any issue reading the file
 */
file.read = async (fileName, path, encoding) => {
  let data;
  try {
    data = await readFile((path || inputPath) + fileName, 'UTF-8');
  } catch (errorReadingFile) {
    console.log(`Error reading file ${path}${fileName}!`);
    throw errorReadingFile;
  }

  return data;
}

/**
 * Rename file
 * @param {string} oldName - name of the file to be renamed
 * @param {string} newName - new name for the file
 * @param {string} path - path where the file is located
 * @returns {Promise<void>}
 * @throws Throws error if there is an error while renaming
 */
file.rename = async (oldName, newName, path) => {
  try {
    await rename(`${path.replace(/\/$/, '')}/${oldName}`, `${path.replace(/\/$/, '')}/${newName}`);
  } catch (errorRenamingFile) {
    console.log(`Error renaming file from ${path}${oldName} to ${path}${newName}!`);
    throw errorRenamingFile;
  }
};

/**
 * Write file to path
 * @param {string} - name to save the file with
 * @param {string|object} - Data to save in the file. Needs to be serializable
 * @param {string} [path] - Path where to save the file. If omitted uses './data/' by default
 * @returns {Promise<void>}
 * @throws Throws error if the data parsing fails or if there is any error writing file
 */
file.write = async (fileName, data, path) => {
  try {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    await writeFile((path || inputPath) + fileName, data, 'UTF-8');
  } catch (errorWritingFile) {
    console.log(`Error writing file ${path}${fileName}!`);
    throw errorWritingFile;
  }
}

/**
 * Read file with json extension and returns parsed JSON data
 * @param {string} fileName - name of the file to read. Must be a json file. Name must not contain the extension
 * @param {string} [path] - Path where to save the file. If omitted uses './data/' by default
 * @returns {Promise<object>}
 * @throws Throws error if the data parsing fails or if there is any error reading file
 */
file.read.json = async (fileName, path) => {
  let jsonData;
  try {
    jsonData = await readFile((path || inputPath) + fileName + '.json', 'UTF-8');
    jsonData = JSON.parse(jsonData);
  } catch (errorReadingFile) {
    console.log(`Error reading json file ${path || inputPath}${fileName}!`);
    throw errorReadingFile;
  }

  return jsonData;
}

/**
 * Read file with prj extension and returns parsed JSON data
 * @param {string} fileName - name of the file to read. Must be a prj file. Name must not contain the extension
 * @param {string} [path] - Path where to save the file. If omitted uses './data/' by default
 * @returns {Promise<import("node:buffer").Buffer>}
 * @throws Throws error if there is any error reading file
 */
file.read.prj = async (fileName, path) => {
  let prjData;
  try {
    prjData = await readFile((path || inputPath) + fileName + '.prj', 'UTF-8');
  } catch (errorReadingFile) {
    console.log(`Error reading prj file ${path || inputPath}${fileName}!`);
    throw errorReadingFile;
  }

  return prjData;
}

/**
 * Read file with geojson extension and returns parsed JSON data
 * @param {string} fileName - name of the file to read. Must be a geojson file. Name must not contain the extension
 * @param {string} [path] - Path where to save the file. If omitted uses './data/' by default
 * @returns {Promise<object>}
 * @throws Throws error if the data parsing fails or if there is any error reading file
 */
file.read.geojson = async (fileName, path) => {
  let geojsonData;
  try {
    geojsonData = await readFile((path || inputPath) + fileName + '.geojson', 'UTF-8');
    geojsonData = JSON.parse(geojsonData);
  } catch (errorReadingFile) {
    console.log(`Error reading geojson file ${path || inputPath}${fileName}!`);
    throw errorReadingFile;
  }

  return geojsonData;
}

/**
 * Read the names of all files currently in the folder
 * @param {string} path - Path where to read the file names from
 * @returns {Promise<Array<string>>}
 * @throws Throws error if there is any error reading file names
 */
file.read.all = async (path) => {
  let files;
  try {
    files = await readdir(path);
  } catch(errorReadingFilesInDir) {
    console.log(`Error reading files in "${path}"`)
    throw errorReadingFilesInDir;
  }
  
  return files;
}


export default file;

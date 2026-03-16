export async function loadJson() {
  let jsonData;
  try {
    const response = await fetch('/data.json');
    jsonData = await response.json();
  } catch (error) {
    console.error(`Error:can't connect to data\n\n${error}`);
  }
  return jsonData;
}

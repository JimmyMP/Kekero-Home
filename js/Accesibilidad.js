// Se usará $ como un selector sin escribir todo completo solo el simbolo $
export const $ = (selector) => document.querySelector(selector) 
// Se hace uso de este para que el primer botón con title="Reload Wallpaper" sea guardado
// en la constante btnReloadWallpaper
export const btnReloadWallpaper = $('button[title="Reload Wallpaper"]');
// Dentro de input estará el primer selector que encuentre con id="query"
export const input = $('#query');
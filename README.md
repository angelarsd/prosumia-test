# prosumia-test
Tets Prosumia

Se requiere construir una web que va a analizar productos y precios de cierta tienda. La página debe mostrar el listado de 
productos con o sin filtro y poder ver el detalle del mismo al hacer click.

Los datos provienen de un webservice en http://54.232.229.116:5000/. A continuación se detallan los endpoint con un breve 
ejemplo del resultado:

  /products: lista todos los productos disponibles
  {  
    "products":[  
    {  
      "id":"7790895005114",
      "desc":"Gaseosa Coca Cola Life Pet x 500 Cc"
    },
    {  
      "id":"7790895006753",
      "desc":"Gaseosa Coca Cola Botella Vidrio x 237 Cc"
    },
    {
      "id":"7790895001482",
      "desc":"Gaseosa Coca Cola Light Pet x 500 Cc"
    },
    ...
    ...

  /products/<id>: obtiene información del producto cuyo código es id. 
  { 
    "brand":"SANCOR SELECCION CDH",
    "price":[52.39,58.29,58.29,67.45],
    "desc":"Queso Fontina Corazon Horma Sancor x 240 Gr"
   }
   /products/search/<search_term>: muestra los productos cuya descripción incluye a search_term.


Algunas preferencias más, sin ser obligatorias:
  - Que sea del estilo single-page 
  - Utilizar Angular, Vue.js o React
  - Un repositorio e instrucciones/scripts para poder ejecutar la prueba
  - Bootstrap o un conjunto de estilos mínimo que permita verlo también en formato mobile
  - En el detalle del producto existe, en la clave prices, un arreglo que representa una serie de tiempo del precio del producto
    durante 4 trimestres. Intentar expresarlo en una visualización gráfica.
  - Placeholder para las imágenes de los productos en su descripción/listado.

Por último, dejá el esqueleto y no implementes nada innecesario. Te diría que trates de ahorrar tiempo y LOC en pos de 
esplayarte en estructura de la aplicación, usabilidad y diseño.

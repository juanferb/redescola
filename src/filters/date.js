/* Un 'filter' es una función.
 Esta función debe devolver la fecha formateada.
 Un filter recibe un parámetro value que siempre
 será una string. Ya que siempre que enviamos algo
 al template se convierte en un string
*/
export default (value) => {
  const date = new Date(value)
  return date.toLocaleString(['es'], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

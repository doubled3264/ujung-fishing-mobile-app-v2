/**
 * omit selected value from object
 * @params {object} obj
 * @params {string} ...props
 * @returns {object}
 */
const omit = (obj: any, ...props: string[]): object => {
   const result = { ...obj }
   props.forEach(function (prop) {
      delete result[prop]
   })
   return result
}

export default omit

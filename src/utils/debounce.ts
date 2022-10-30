export default function debounce(func:Function, ms: number) {
  let timer: NodeJS.Timeout | null = null
  return function (this:any, ...args:any[]) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), ms)
  }
}

export default function throttle(func: Function, ms: number) {
  let isThrottled = false
  let savedArgs:any[] | null, savedThis:any
  return function wrapper(this: any, ...args: any[]){
    if(isThrottled) {
      savedArgs = args
      savedThis = this
      return
    }
    isThrottled = true

    func.apply(this, args)

    setTimeout(() => {
      isThrottled = false
      if(savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, ms)
  }
}
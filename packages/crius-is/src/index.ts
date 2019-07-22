export const isCriusStepClass = (target: any): boolean => {
  return (
    toString.call(target) === '[object Object]' &&
    target.step &&
    target.step.prototype &&
    target.step.prototype.isCriusStep
  );
}

export const isCriusStepFunction = (target: any): boolean => {
  return (
    toString.call(target) === '[object Object]' &&
    typeof target.step === 'function' && (
      !target.step.prototype || !target.step.prototype.isCriusStep
    )
  );
}

export const isCriusStepFragment =  (target: any): boolean => {
  return (
    target.key === '' &&
    target.props &&
    Array.isArray(target.props.children) &&
    (
      typeof target.step === 'undefined' ||
      target.step === null
    )
  )
}

export const isCriusStep = (target: any): boolean  => {
  return (
    isCriusStepClass(target) ||
    isCriusStepFunction(target) || 
    isCriusStepFragment(target)
  );
}


export const isCriusNode = (target: any): boolean  => {
  return (
    toString.call(target) === '[object Object]' ?
    isCriusStep(target) :
    false
  );
}

const isCriusStepClass = (target: any): boolean => {
  return (
    toString.call(target) === '[object Object]' &&
    target.step &&
    target.step.prototype &&
    target.step.prototype.isCriusStep
  );
}

const isCriusStepFunction = (target: any): boolean => {
  return (
    toString.call(target) === '[object Object]' &&
    typeof target.step === 'function' && (
      !target.step.prototype || !target.step.prototype.isCriusStep
    )
  );
}

const isCriusStepFragment =  (target: any): boolean => {
  return (
    toString.call(target) === '[object Object]' &&
    target.key === '' &&
    target.props &&
    Array.isArray(target.props.children) &&
    (
      typeof target.step === 'undefined' ||
      target.step === null
    )
  )
}

const isCriusStep = (target: any): boolean  => {
  return (
    isCriusStepClass(target) ||
    isCriusStepFunction(target) || 
    isCriusStepFragment(target)
  );
}

const isCriusNode = (target: any): boolean  => {
  return (
    toString.call(target) === '[object Object]' ?
    isCriusStep(target) :
    false
  );
}

export {
  isCriusStepClass,
  isCriusStepFunction,
  isCriusStepFragment,
  isCriusStep,
  isCriusNode,
}

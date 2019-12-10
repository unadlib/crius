const isCriusStepClass = (target: any): boolean => {
  return (
    toString.call(target) === '[object Object]' &&
    target.step &&
    target.step.prototype &&
    target.step.prototype.isCriusStep
  );
}

const isCriusStepFunction = (target: any) => {
  return (
    toString.call(target) === '[object Object]' &&
    typeof target.step === 'function' && (
      !target.step.prototype || !target.step.prototype.isCriusStep
    )
  );
}

const isCriusStepFragment =  (target: any) => {
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

const isCriusStep = (target: any)  => {
  return (
    isCriusStepClass(target) ||
    isCriusStepFunction(target)
  );
}

const isCriusStepFlow = (target: any) => {
  return (
    toString.call(target) === '[object Object]' &&
    Object.hasOwnProperty.call(target, 'key') &&
    target.props &&
    Array.isArray(target.props.children) 
  )
};

const isCriusFlow = (target: any) => {
  return isCriusStepFlow(target) || isCriusStepFragment(target) ;
};

const isCriusNode = (target: any)  => {
  return (
    toString.call(target) === '[object Object]' &&
    isCriusStep(target)
  );
}

export {
  isCriusStepClass,
  isCriusStepFunction,
  isCriusStep,
  isCriusNode,
  isCriusFlow,
  isCriusStepFragment,
  isCriusStepFlow
}

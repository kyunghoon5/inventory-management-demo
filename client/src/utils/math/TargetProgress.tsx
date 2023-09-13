

const TargetProgress = () => {
  const targetProgessCal = (onhandArr:number, targetArr: number) => {
    


    const progressArr = ((onhandArr / targetArr)*100).toFixed(0)
    return progressArr;
  };
  return { targetProgessCal };
};

export default TargetProgress
import { useState } from 'react';

import DataGridMain from './components/DataGridMain';
import ImageSwiper from './components/ImageSwiper';
import ProcessingBar from './components/ProcessingBar';


const Newlaunch = () => {


  const [newLaunchImageNumber, setNewLaunchImageNumber] = useState(0);

  const [ProgressInfo, setProgessInfo] = useState('');



  return (
    <div className="p-5  flex ">
      <div className="p-5 w-1/5 h-screen  flex flex-col justify-between  ">
        <ImageSwiper newLaunchImageNumber={newLaunchImageNumber} />
      </div>

      <div className="ml-4 p-5 w-4/5 h-screen flex flex-col justify-between ">
        <div className="mb-4 w-full h-1/2 ">
          <DataGridMain
            setNewLaunchImageNumber={setNewLaunchImageNumber}
            setProgessInfo={setProgessInfo}
          />
        </div>
        <div className=" w-full h-1/2 ">
          <ProcessingBar
            ProgressInfo={ProgressInfo}
            setProgessInfo={setProgessInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default Newlaunch;

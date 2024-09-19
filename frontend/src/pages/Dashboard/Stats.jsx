import React, { useEffect, useState } from 'react';
import doc from '/Logo/Stats/doc.svg';
import image from '/Logo/Stats/image.svg';
import other from '/Logo/Stats/other.svg';
import video from '/Logo/Stats/video.svg';
import ProgressBar from '../Common/ProgressBar';
import { checkFile } from '../../utils/fileType'; // Assuming checkFile is updated to handle size

function Stats({ data ,data2}) {
  const [datas, setData] = useState([
    { type: "image", quantity: 0, totalSize: 0 },
    { type: "video", quantity: 0, totalSize: 0 },
    { type: "document", quantity: 0, totalSize: 0 },
    { type: "other", quantity: 0, totalSize: 0 },
  ]);

  useEffect(() => {
    const fetchFileTypes = async () => {
      // Prepare the data array with file types and sizes
      const fileDetails = data.map(item => ({ fileType: item.type, size: item.size }));
      const updatedData = await checkFile(fileDetails);
      setData(updatedData);
    };

    fetchFileTypes();
  }, [data]);

  return (
    <div className='p-8 w-full h-[50%] flex justify-between items-end font-inter'>
      {datas.map((item, i) => (
        <div key={i} className='bg-[#e7e7e763] w-[24%] h-[50%] cursor-pointer rounded-[20px] p-3 flex-col hover:scale-105 duration-200 transition-all'>
          <div className='flex w-full justify-between'>
            <img
              src={item.type === 'image' ? image : item.type === 'video' ? video : item.type === 'document' ? doc : other}
              alt=""
            />
            <div className='w-[70%] flex flex-col justify-center items-start'>
              <p className='font-bold'>
                {item.type === 'image' ? "Images" : item.type === 'video' ? "Videos" : item.type === 'document' ? "Documents" : "Others"}
              </p>
              <p>{item.quantity} Items</p>
            </div>
          </div>
          <div className='w-full h-[80%] flex flex-col justify-center items-start'>
            <ProgressBar
              total={data2.doc} // Replace with total size if available
              available={((item.totalSize)/1024/1024).toFixed(1)}
              px={0}
            />
            <p className="p-1 text-[12px]">{((item.totalSize)/1024/1024).toFixed(1)} MB OF {data2.doc} MB</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stats;

import React, { useEffect, useState, useRef } from 'react'
import HeaderAiGeneration from '../../components/generation/HeaderAiGeneration'
import ImageGeneration from '../../components/generation/ImageGeneration'
import AdminLoading from '../../components/shared/AdminLoading'
// import { generateImage } from '../../store/imageGeneralSlice'
import { updateUserFromLocalStorage, upgradeToken, addHistoryImageGenerated } from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'

import io from 'socket.io-client';
const socket = io(`${process.env.REACT_APP_URL}`);

const AiGenerations = () => {
  const [randomImages, setRandomImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [prompt, setPrompt] = useState('');
  const [dateCreate, setDateCreate] = useState('');

  const handlePromptChange = (keyword) => {
    setPrompt(keyword.target.value);
  };

  const { loading, error, imageGeneral } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString();
    setDateCreate(formattedDateTime)
  }, []);

  const handleGenerateImages = () => {
    dispatch(upgradeToken()).then((result) => {
      if (result?.payload?.status === 200) {
        updateUserFromLocalStorage({ tokens: result?.payload?.data?.tokens })
      }
    })

    setIsLoading(true)

    //CALL API ĐỂ GENERATE IMAGE
    const requestData = JSON.stringify({
      "key": "Jc1F3VsOCTtw6SF5pMdBG7BgZar4NTpusNQpyyYhdLMFRGILqmemUQaedASg",
      "prompt": prompt,
      "negative_prompt": null,
      "width": "512",
      "height": "512",
      "samples": "4",
      "num_inference_steps": "20",
      "seed": null,
      "guidance_scale": 7.5,
      "safety_checker": "yes",
      "multi_lingual": "no",
      "panorama": "no",
      "self_attention": "no",
      "upscale": "no",
      "embeddings_model": null,
      "webhook": null,
      "track_id": null
    });

    fetch("https://stablediffusionapi.com/api/v3/text2img", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestData,
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        console.log("result image generate list: ", result)
        setRandomImages(result.output)

        const currentDateTime = new Date();
        const formattedDateTime = currentDateTime.toISOString();

        const infoGenerated = {
          prompt: prompt,
          imageGenerate: result.output,
          createdAt: formattedDateTime
        }

        dispatch(addHistoryImageGenerated(infoGenerated)).then((result) => {
          console.log(result)
        })

        setIsLoading(false)
      })
      .catch(error => {
        console.log('error', error);
        // Xử lý lỗi nếu cần
      });

  };

  return (
    <div className='ai-generations'>
      <HeaderAiGeneration
        onGenerateClick={handleGenerateImages}
        prompt={prompt}
        onPromptChange={handlePromptChange}
      />

      <ImageGeneration randomImages={randomImages} loading={isLoading} error={error} prompt={prompt} createdAt={dateCreate} />
    </div>
  )
}

export default AiGenerations
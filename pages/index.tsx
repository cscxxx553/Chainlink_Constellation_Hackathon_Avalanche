import { ConnectWallet, Web3Button, useAddress, useBurnNFT, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { AVACATNFT_ADDRESS, DESTINATIONMINTER_ADDRESS, DESTINATIONWALLET_ADDRESS, EDITIONDROP_ADDRESS, FUNCTION_GETWEATHER_ADDRESS, OPENWEATHERMAP_KEY, SOURCEMINTER_ADDRESS, VRFRANDOM_ADDRESS } from "../const/constants";
import NFTGrid from "../components/NFTGrid";
import { useEffect, useState } from "react";


const Home: NextPage = () => {

  interface AvaNft {
    token: number;
    quentity: number;
    image: string;
  };

  interface RandomType {
    _hex: string;
    _type: string;
  };
  type Data = [boolean, RandomType[]];

  const address = useAddress();
  const { contract } = useContract(EDITIONDROP_ADDRESS);
  const { data, isLoading } = useOwnedNFTs( contract, address );
  const { mutateAsync: burnNft, isLoading: loadingBurnNft, error } = useBurnNFT(contract);
  const [ cardboardBoxID, setCardboardBoxID ] = useState('');
  const [ recyclingNuber, setRecyclingNuber ] = useState('');
  const [seconds, setSeconds] = useState(0);
  
  const { contract:avaCatContract } = useContract(AVACATNFT_ADDRESS);
  const { contract:getWeatherContract } = useContract(FUNCTION_GETWEATHER_ADDRESS);
  const { contract:vrfRandom } = useContract(VRFRANDOM_ADDRESS);
  const [avaCatNFTs, setAvaCatNFTs] = useState<number[]>([]);
  const [avaCatURI, setAvaCatURI] = useState<AvaNft[]>([]);
  const [lastRequestId, setLastRequestId] = useState();
  const [randomNumber, setRandomNumber] = useState<RandomType[]>([]);
  const [openMessage, setOpenMessage] = useState('');

  const { contract:sourceMinterContract } = useContract(SOURCEMINTER_ADDRESS);
  
  const openCardboard = async() => {
    const randomN = parseInt(randomNumber[0]._hex, 16);
    console.log("randomNumber[1][1]", randomN);
    const str: string = randomN.toString();
    const firstChar: number = parseInt(str[0]);
    const randomInteger: number = Math.floor(Math.random() * 10);
    if(randomInteger >= firstChar){
      setOpenMessage("Lucky you. your number: "+randomInteger+" is greater than the random: "+firstChar+" need get weather, mint cat and recycling comfirmation." )
      pickUpACat();
    }else{
      setOpenMessage("Try again. your number: "+randomInteger+" is less than the random: "+firstChar)
    }
  }

  const openCardboardtoMumbai = async() => {
    const randomN = parseInt(randomNumber[0]._hex, 16);
    console.log("randomNumber[1][1]", randomN);
    const str: string = randomN.toString();
    const firstChar: number = parseInt(str[0]);
    const randomInteger: number = Math.floor(Math.random() * 10);
    if(randomInteger >= firstChar){
      setOpenMessage("Lucky you. your number: "+randomInteger+" is greater than the random: "+firstChar+" need get weather, mint cat and recycling comfirmation." )
      pickUpACatOnMumbai();
    }else{
      setOpenMessage("Try again. your number: "+randomInteger+" is less than the random: "+firstChar)
    }
  }

  const pickUpACat = async() => {
    await getWeatherContract?.call("sendRequest", [1485,[OPENWEATHERMAP_KEY]]);
    await avaCatContract?.call("mint",[address, 1, []]);
    await contract?.call("burnBatch",[address, [cardboardBoxID], [recyclingNuber]]);
    setCardboardBoxID('');
    setRecyclingNuber('');
    setAvaCatNFTs([]);
    setAvaCatURI([]);
    if(avaCatURI.length > 0){
      const elements = document.querySelectorAll(`.${'avaCatDiv'}`);
      
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        }
    }
    getAvaCatContract();
  }

  const destinationChainSelector = BigInt("12532609583862916517"); // BigInt or BigNumber
  const payFeesIn = 1; // Number

  const pickUpACatOnMumbai = async() => {
    await sourceMinterContract?.call("mint",[destinationChainSelector, DESTINATIONMINTER_ADDRESS, payFeesIn, DESTINATIONWALLET_ADDRESS]);
    await contract?.call("burnBatch",[address, [cardboardBoxID], [recyclingNuber]]);
    setCardboardBoxID('');
    setRecyclingNuber('');
    setAvaCatNFTs([]);
    setAvaCatURI([]);
    if(avaCatURI.length > 0){
      const elements = document.querySelectorAll(`.${'avaCatDiv'}`);
      
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        }
    }
    
  }

  const getAvaCatContract = async() =>{
    try {
      
        // avaCatNFTs = await avaCatContract?.call("balanceOfBatch", [[address,address,address,address], [0,1,2,3]])
        const tempArray: number[] = await avaCatContract?.call("balanceOfBatch", [[address,address,address,address], [0,1,2,3]])
        setAvaCatNFTs(tempArray);
        const tempUriArray = assembUriArray(tempArray);
        
    }catch(error){
        console.error('Error fetching balances:', error);
    }
  }

  const assembUriArray = async(tempArray: number[]) => {
    console.log("avaCatNFTs ",avaCatNFTs);
    if(tempArray?.length>0){
      const newArr = [];
      tempArray?.forEach(async(value: number,index: any)=>{
        if(value!=0){
                  const uriJson = await avaCatContract?.call("uri", [index]);
                  const imageUrl = await (await fetch(uriJson)).json();
                  const newData = [
                      {
                        token: index,
                        quentity: value,
                        image: imageUrl.image
                      }
                    ];
                  setAvaCatURI((prevRecords) => [...prevRecords, ...newData]);
              }
          })
          const vr = await vrfRandom?.call("lastRequestId", []);
          const timer = setTimeout(() => {
            setSeconds(5); // Update the state after 5 seconds
          }, 2000); // Wait for 5 seconds (5000 milliseconds)
          console.log("vr ", vr);
          setLastRequestId(vr);
          const lr: Data = (await (await vrfRandom?.call("getRequestStatus", [vr])));
          console.log("lr ",lr[1]);
          setRandomNumber(lr[1]);
    }
  }

  useEffect(() => {
      getAvaCatContract();
      
  },[address, avaCatContract, getWeatherContract, vrfRandom])



  return (
    <main className={styles.main}>
      <div className={styles.container}>
      <h1>In Frigid Winter.</h1>
        <ConnectWallet />
        {!address ? (
          <h2>Loading...</h2>
        ) : (
          <div>
            <h3>1. Get cardboard box:</h3>
            <NFTGrid 
              isLoading={isLoading}
              nfts={data}
              emptyText="Get a cardboard box."
            />
            <div>
              <Web3Button
                contractAddress={EDITIONDROP_ADDRESS}
                action={ (contract) => contract.erc1155.claim(1, 1)}
              >Get a Cardboard Box</Web3Button> 
            </div>
            
            <br />
            <h3>2. How to deal with the cardboard box:</h3>
            <div>
              <h4>Cardboard Box ID(Token ID):</h4>
              <input
                value={cardboardBoxID}
                onChange={(e) => {
                  setCardboardBoxID(e.target.value);
                }}
              />
              <h4>Quentity:</h4>
              <input
                value={recyclingNuber}
                onChange={(e) => {
                  setRecyclingNuber(e.target.value);
                }}
              />
              <br />
              <br />
              <div>
                <Web3Button
                  contractAddress={AVACATNFT_ADDRESS}
                  action={(avaCatContract) => openCardboard()}
                >Open Cardboard Box</Web3Button>
              </div>
              <div>{openMessage}</div>
              <br />
              <div>
                <Web3Button
                  contractAddress={AVACATNFT_ADDRESS}
                  action={(avaCatContract) => openCardboardtoMumbai()}
                >Open Cardboard Box To Mumbai</Web3Button>
              </div>
              <br />
                <Web3Button
                  contractAddress={EDITIONDROP_ADDRESS}
                  action={(contract) => {
                    contract.call("burnBatch",[address, [cardboardBoxID], [recyclingNuber]]);
                    setCardboardBoxID('');
                    setRecyclingNuber('');
                  }
                  }
                >Recycling(Cardboard Box)</Web3Button>
              </div>
              <br />

              <h3>3. What you get:</h3>
              <div>
              {(avaCatNFTs?.length==0)  ? (
                  <h3>Loading...</h3>
              ) : (
                  <div>
                      <p>Cats from Avalanche:</p>
                          {avaCatURI.map((data, index) => (
                            <div className="avaCatDiv" key={index}>
                                <ul>
                                  <img src={data.image} />
                                  <li >{`Token ${data.token}: ${data.quentity} `}</li>
                                </ul>
                            </div>
                          ))}
                  </div>
              )
              }
              </div>
            
          </div>
        ) }
      </div>
    </main>
  );
};

export default Home;

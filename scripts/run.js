const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract addy:", waveContract.address);
  
    let waveCount;
    waveCount = await waveContract.getTotalJokes();
    console.log(waveCount.toNumber());
  

    let waveTxn = await waveContract.joke("A message!");
    await waveTxn.wait();
  
    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).joke("Another message!");
    await waveTxn.wait();
  
    let allWaves = await waveContract.getAllJokes();
    console.log(allWaves);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
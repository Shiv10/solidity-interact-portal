const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log("Contract addy:", waveContract.address);

    let currentBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log(`Contract balance: ${hre.ethers.utils.formatEther(currentBalance)}`);
  
    let waveCount;
    waveCount = await waveContract.getTotalJokes();
    console.log(waveCount.toNumber());
  

    let waveTxn = await waveContract.joke("A message!");
    await waveTxn.wait();
  
    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).joke("Another message!");
    await waveTxn.wait();

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log(`Contract balance: ${hre.ethers.utils.formatEther(contractBalance)}`);
  
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
const main = async () => {

    const [owner, randomPerson] = await hre.ethers.getSigners()
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed by: ", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalJokes();

    let waveTxn = await waveContract.joke();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalJokes();

    waveTxn = await waveContract.connect(randomPerson).joke();
    await waveTxn.wait();
    waveCount = await waveContract.getTotalJokes();
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

runMain();
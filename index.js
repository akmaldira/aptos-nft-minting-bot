import { main } from './handle.js';
import inquirer from 'inquirer';

const question1 = async () => {
    return await inquirer.prompt({
        name: 'launchPick',
        type: 'list',
        message: 'Launchpad Minting ?',
        choices: [
            'LaunchMyNFT',
            'BlueMove',
            'FTM Machine (as soon as possible)',
        ]
    })
}

const question2 = async () => {
    return await inquirer.prompt({
        name: 'hasEdit',
        type: 'list',
        message: 'Already edit all environment on .env file ?',
        choices: [
            'Yes',
            'No',
        ]
    });
}

const question3 = async () => {
    return await inquirer.prompt({
        name: 'time',
        type: 'input',
        message: 'Start Time (Unix Time) ?',
    })
}

(async() => {
    console.clear();

    const launch = await question1();
    const machineAddress = await question2();
    
    if (machineAddress.hasEdit === 'Yes') {
        if (launch.launchPick === 'LaunchMyNFT') {
            const payload = {
                "function": '0x9b9812f618c67f447aeaa93605074433f2f11489e23d7e775f2d705d2f40f86::minting::mint',
                "type_arguments": [],
                "arguments": [
                    process.env.MACHINE_ADDRESS,
                    "0",
                    "1",
                    "0x"
                ],
                "type": "entry_function_payload"
            }
            console.log('Public Only (more soon)');
            const startTime = await question3();
            await main(startTime.time, payload);
        } else if (launch.launchPick === 'BlueMove') {
            
            const mintType = await inquirer.prompt({
                name: 'type',
                type: 'list',
                message: 'Mint Type ?',
                choices: [
                    'Public',
                    'Whitelist',
                ]
            })

            const startTime = await question3();
            const type = mintType.type === 'Public' ? 'mint_with_quantity' : 'mint_with_quantity_whitelist';

            const payload = {
                "function": `${process.env.MACHINE_ADDRESS}::factory::${type}`,
                "type_arguments": [],
                "arguments": [
                    "1" //total mint
                ],
                "type": "entry_function_payload"
            }
            await main(startTime.time, payload);
        } else if (launch.launchPick === 'FTM Machine (as soon as possible)') {
            console.log('\nSoon blok');
        }
    } else {
        console.log('Edit dlu blok');
    }
})

()

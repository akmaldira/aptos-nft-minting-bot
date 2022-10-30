# How To Use

```
1. npm install
2. edit .env variable (to get MACHINE_ADDRESS you can see below)
3. node index.js
```



> LaunchMyNFT
```
1. Open launchpad page
2. Press f12
3. On the top if you cant see "Network", ">>" then press "Network"
4. See on the name, wait page load "resources" and press "resources"
5. Select Priview
6. You can see machine address at > 3, > 4, > 5 (0x............)
7. Press > 4 > data > phazes > 0 > You can see startTime
```

> Blue Move
```
1. Copy url on the launchpad page
    ex : https://bluemove.net/collection/ghost-street
    slug is : ghost-street
2. Edit https://aptos-mainnet-api.bluemove.net/api/launchpads?filters[launchpad_slug][$eq]=YOURSLUG&sort[0]=start_time%3Aasc with your slug
3. Open it on the browser, and you can see modules_address (machine address) and startTime
    if the modules_address is only 0x, wait till Blue Move change it, it'll change before minting time
```
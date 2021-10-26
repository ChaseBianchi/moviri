// array of arrays is a data structure of csv libraries like via react-csv
// or other similar libraries ive used on front end 
// https://www.npmjs.com/package/react-csv
const bitrate = [
    ['Timestamp','Server','InterfaceName','NetBitRate'],
    ['2019-05-07 19:17:23','server1','eth0','1000'],
    ['2019-03-30 19:41:33','server4','eth0','200'],
    ['2019-06-18 07:38:11','server1','eth0','100'],
    ['2019-03-08 08:29:38','server3','eth1','80'],
    ['2019-04-21 04:50:41','server3','eth1','500'],
    ['2019-04-06 06:28:31','server4','eth0','660'],
    ['2019-05-02 08:33:40','server1','eth1','1000'],
    ['2019-06-06 06:02:10','server2','eth0','1000'],
    ['2019-02-28 20:16:54','server4','eth0','1000'],
    ['2019-04-05 23:57:00','server2','eth0','500'],
    ['2019-04-21 23:31:19','server1','eth0','400'],
    ['2019-06-24 09:49:58','server3','eth1','80'],
    ['2019-04-04 10:34:24','server1','eth1','1000'],
    ['2019-06-14 15:13:36','server2','eth0','660'],
    ['2019-02-13 19:19:49','server4','eth0','800'],
    ['2019-02-03 19:03:03','server4','eth0','1000'],
    ['2019-01-07 00:49:05','server3','eth1','100'],
    ['2019-05-08 13:14:21','server1','eth0','500'],
    ['2019-03-23 23:36:03','server1','eth1','100'],
    ['2019-02-06 14:44:09','server2','eth0','100'],
]

const bandwidth = [
    ['Server', 'InterfaceName', 'Bandwidth'],
    ['server1','eth0','10'],
    ['server1','eth1','20'],
    ['server2','eth0','10'],
    ['server3','eth0','5'],
    ['server3','eth1','10'],
    ['server4','eth0','160'],

]

const printNetworkBandwidthFromCsv = ((bit, band)=>{
    // edge cases/error handling
    if(!bit){
        console.log('Error: no bitrate values detected')
        return
    }
    if(bit[0].length!==4){
        console.log('Error: bitrate file format incorrect')
        return
    }
    if(!band){
        console.log('Error: no bandrate values detected')
        return
    }
    if(band[0].length!==3){
        console.log('Error: bandwidth file format incorrect')
        return
    }
    //could add more verification here like verifying columns in csv file, etc.
    //but for now going to assume data integrity is kept

    //convert bandwidth arrays to a map
    const bandMap = {}
    for(let i=1; i<band.length;i++){
        const server = band[i][0]
        const interface = band[i][1]
        const bandwidth = band[i][2]
        if(bandMap.hasOwnProperty(server)){
            
            bandMap[server] = {...bandMap[server], [interface]: bandwidth}
        }
        else{
            bandMap[server] = {[interface]: bandwidth}
        }
    }
    // console.log(bandMap)

    //iterate and print for each bitrate
    let i = 1
    while(i<bit.length){
        const server = bit[i][1]
        const interface = bit[i][2]
        let calculated = parseFloat(bitrate[i][3]/bandMap[server][interface])
        calculated = +calculated.toFixed(4).toString() /* handle infinite repeating numbers. toString is optional depending on prefered data type */
        let printString = `${bitrate[i][0]} ${bitrate[i][1]} ${bitrate[i][2]} ${calculated}`
        console.log(printString)
        i++
    }

})

//call function
printNetworkBandwidthFromCsv(bitrate, bandwidth)
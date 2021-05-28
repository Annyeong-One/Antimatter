const Discord = require("discord.js");
const config = require('./config.json')
const ytdl = require("ytdl-core");
const opus = require("@discordjs/opus")
const ffmpegneeded = require('ffmpeg-static');
const hook = new Discord.WebhookClient('847636751379857448', config.hooktoken);
const client = new Discord.Client();
const prefix = ">"
const queue = new Map();


client.on("ready", () => { 
    console.log(`successfully logged in to: ${client.user.tag}, bot is deployed`);
    console.log(`ping: ${client.ws.ping}`)
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'c1_환영해요');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the msg, mentioning the member
    channel.send(`${member}님, 서버에 오신 것을 환영해요!`);
});
//from here is command lists
client.on("message", msg => {
    if (!msg.guild) return;
    if (msg.content.indexOf(prefix) !== 0) return; // Prefix?
    var args = msg.content.slice(prefix.length).trim().split(/ +/g); // argument(args) split
    var command = args.shift().toLowerCase();
    const serverQueue = queue.get(msg.guild.id);
    console.log(`command starting, ping: ${client.ws.ping}`)
    if (command === `핑`) { // 핑확인
        var embed = new Discord.MessageEmbed()
            .setColor("DEFAULT")
            .setDescription(`퐁! 현재 Antimatter의 핑은 ${client.ws.ping}ms입니다.`)
        msg.reply(embed)
    }
    if (command === `변`) {
        var embed = new Discord.MessageEmbed()
            .setTitle("변!") 
            .setDescription("뭐 하는 거야!") // title description
            .setColor("GOLD") // can use hex
            .setFooter("이런 것도 있누") // footer
            .setThumbnail("https://cdn.discordapp.com/attachments/743278181112610828/812323526287556658/20210212_141937.jpg") // 여기는 임베드에서 썸네일로 불려옵니다! (URL를 넣어가 경로를 기입하면 그 경로에 있는 이미지를 불러와 썸네일로 이용되요!)
            .setImage("https://cdn.discordapp.com/attachments/743278181112610828/812323525863669800/7e41d26.jpg") // mainimg
            .setTimestamp() // empty for current time, dont fill
            .addField("오 예", "미터법이 최고지") // description
        msg.reply(embed) // reply msg=
    }
    if (command === "help") {
        var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Antimatter 도움말')
        .setURL('https://discord.js.org/')
        .setAuthor('Annyeong1#8912', 'https://media.discordapp.net/attachments/805963165229776951/811130967871717430/peter20071203.gif', 'https://discord.js.org')
        .setDescription('안티매터봇의 명령어 목록입니다.')
        .setThumbnail('https://cdn.discordapp.com/attachments/805963165229776951/813049052685008936/Screenshot_20190301-090946.png')
        .addField('0. 도움', '업뎃내역\nhelp-easter', true)
        .addField('1. 기능', '핑\n청소\n삭제\n아바타', true)
        .addField('2. 말주고받기', '변\n무야호\n멍청이\n안티매터\n아\n오\ndixdick\na반\nb반\nc반\npi', true)
        msg.reply(embed) // reply msg
    }
    if (command === "help-easter") {
        var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Antimatter 이스터에그 도움말')
        .setURL('https://discord.js.org/')
        .setAuthor('Annyeong1#8912', 'https://media.discordapp.net/attachments/805963165229776951/811130967871717430/peter20071203.gif', 'https://discord.js.org')
        .setDescription('이스터에그 총 4개, 발견된 것 3개')
        .setThumbnail('https://cdn.discordapp.com/attachments/805963165229776951/813049052685008936/Screenshot_20190301-090946.png')
        .addField('1. 형식', '접두사 이후 띄어쓰기가 없는 단어입니다.', true)
        .addField('2. 힌트 보기', '>힌트a-b를 사용하여 a번째 이스터에그의\nb번째 힌트를 확인할 수 있습니다.\n띄어쓰기는 하지 않아야 합니다.', true)
        .addField('3. 목록', '0번 이스터에그 - WW91bmdyZS1pcy1pZGlvdC03ODU5MDQyMw==, 힌트 ???개\n1번 이스터에그 - 변목길이50킬로미터, 힌트 3개\n2번 이스터에그 - 변튜브구독과좋아요알림설정, 힌트 2개\n3번 이스터에그 - 샤프심만한눈, 힌트 3개\n4번 이스터에그 - 글자수 영문18개, 힌트 3개', true)
        msg.reply(embed) // reply msg
    }
    if (command === "업뎃내역") {
        msg.channel.bulkDelete(1).then(msg.channel.send(`안티매터 봇이 1.0버전으로 업데이트 되었습니다!\n봇 24시간 구동을 시작합니다.`))
        msg.channel.send("이스터에그 및 이스터에그용 힌트, >청소 명령어 실패, 업뎃내역 등 일부를 제외한 명령어가 임베드됩니다.")
        msg.channel.send("도배 명령어가 삭제됩니다.")
        msg.channel.send("chudnovsky 명령어가 삭제됩니다.")
        msg.channel.send("dixdick 명령어가 개편됩니다.")
        msg.channel.send("지금 막 사용하신 업뎃내역 명령어가 추가됩니다.")
        msg.channel.send("갸변저항 명령어가 개편되며, 갸변 저항 노래를 들을 수 있는 기능이 추가됩니다. >help에서 더 알아볼 수 있습니다.")
        msg.channel.send("청소흔적없이 명령어가 삭제됩니다.")
    }
    if (command === "아바타") {
        msg.reply(msg.author.displayAvatarURL());
    }
    if (command === "멍청이") {
        var embed = new Discord.MessageEmbed()
            .setColor("DEFAULT")
            .setDescription(`그것은 바로 영레였네요!`)
        msg.reply(embed)
    }
    if (command === "안티매터") {
        var embed = new Discord.MessageEmbed()
            .setColor("DEFAULT")
            .setDescription(`https://ivark.github.io/`)
        msg.reply(embed)
    }
    if (command === "dixdick") {
        var embed = new Discord.MessageEmbed()
            .setColor("DEFAULT")
            .setDescription(`https://docs.google.com/document/d/1hf-7PVbFCfcgPxxHuVzS5PDZx1N2tRfJfVJ4cskPWYY/edit?usp=sharing`)
        msg.reply(embed)
    }
    if (command === "아") {
        var embed = new Discord.MessageEmbed()
            .setColor("DEFAULT")
            .setDescription(`그렇네!`)
        msg.reply(embed)
    }
    if (command === "오") {
        var embed = new Discord.MessageEmbed()
            .setColor("DEFAULT")
            .setDescription(`예!`)
        msg.reply(embed)
    }
    if (command === "갸변저항") {
        var embed = new Discord.MessageEmbed()
        .setTitle("GyaByun Resistor 노래 모음")
        .addField('Aleph Byun', '>gyabyun-1', true)
        .addField('Byuntapper', '>gyabyun-2', true)
        .addField('R', '>gyabyun-3', true)
        .addField('sd-byunbyunbyun', '>gyabyun-4', true)
        .addField('노래 끝내기', '>stop', true)
        msg.reply(embed);
    }
    if (command === "gyabyun-1") {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel)
            return msg.channel.send(
                "You need to be in a voice channel to play music!"
            );
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return msg.channel.send(
                "I need the permissions to join and speak in your voice channel!"
            );
        }
        voiceChannel.join()
            .then(connection => {
                connection.play('./sendfile/Aleph-Byun.mp3');
                for (const connection of client.voice.connections.values()) {
            }
            })
        
    }
    if (command === "gyabyun-2") {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel)
            return msg.channel.send(
                "You need to be in a voice channel to play music!"
            );
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return msg.channel.send(
                "I need the permissions to join and speak in your voice channel!"
            );
        }
        voiceChannel.join()
            .then(connection => {
                connection.play('./sendfile/bbbyyyuuunnn.mp3');
                for (const connection of client.voice.connections.values()) {
            }
            })
        
    }
    if (command === "gyabyun-3") {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel)
            return msg.channel.send(
                "You need to be in a voice channel to play music!"
            );
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return msg.channel.send(
                "I need the permissions to join and speak in your voice channel!"
            );
        }
        voiceChannel.join()
            .then(connection => {
                connection.play('./sendfile/byuntapper.mp3');
                for (const connection of client.voice.connections.values()) {
            }
            })
        
    }
    if (command === "gyabyun-4") {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel)
            return msg.channel.send(
                "You need to be in a voice channel to play music!"
            );
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return msg.channel.send(
                "I need the permissions to join and speak in your voice channel!"
            );
        }
        voiceChannel.join()
            .then(connection => {
                connection.play('./sendfile/R.mp3');
                for (const connection of client.voice.connections.values()) {
            }
            })
        
    }
    if (command === "stop") {
        const voiceChannel = msg.member.voice.channel;
        voiceChannel.leave();
        return;
    }
    if (command === "a반") {
        var embed = new Discord.MessageEmbed()
            .setColor("DEFAULT")
            .setDescription(`???: 아 얘들아 A형을 누가 90점을 못 맞니\n¿¿¿: 마음이 아프다`)
        msg.reply(embed)
    }
    if (command === "b반") {
        var embed = new Discord.MessageEmbed()
            .setColor("DEFAULT")
            .setDescription(`¿¿¿: 아 얘들아 A형을 누가 40점을 못 맞니\n???: 마음이 아프다`)
        msg.reply(embed)
    }
    if (command === "c반") {
        var embed = new Discord.MessageEmbed()
            .setColor("DEFAULT")
            .setDescription(`¿¿¿: 오로나변씨 기원\n???: 안돼!`)
        msg.reply(embed)
    }
    if (command === "무야호") {
        var embed = new Discord.MessageEmbed()
            .setColor("DEFAULT")
            .setThumbnail('https://cdn.discordapp.com/attachments/772338297280135178/830965854954848286/l_2021031401001628900137951.png')
            .setDescription(`그만큼 안티매터가 좋으시다는거지..?`)
        msg.reply(embed)
    }
    if (command === "pi") {
        msg.channel.send({files: ['./sendfile/314159.txt']});
    }
    if (command === `청소`) { // 만약에 메세지 내용이 청소라면?
        if (!args[0]) {
            msg.reply("청소할 만큼의 값을 >청소 10 과 같이 정수로 적어주세요!") // undo if empty
        }
        else if (args[0] < 0) {
            msg.reply(`메세지를 ${args[0]}개 지울 순 없어요. 1 이상 50 이하의 자연수를 적어주세요!`) // integer
        }
        else if (args[0] > 50) {
            msg.reply(`${args[0]}개씩이나 지울 일이 있어요? 최대 50개까지 지울 수 있어요!`) // undo if length > 10
        }
        else {
        msg.channel.bulkDelete(args[0])
        var embed = new Discord.MessageEmbed()
            .setColor("DEFAULT")
            .setDescription(`성공적으로 ${args[0]}개 만큼 메세지를 삭제하였습니다!`)
        msg.reply(embed)
        }
    }
    if (command === `삭제`) { 
        if (!args[0]) {
            msg.reply("청소할 만큼의 값을 >청소 10 과 같이 정수로 적어주세요!") // undo if empty
        }
        else if (args[0] < 0) {
            msg.reply(`메세지를 ${args[0]}개 지울 순 없어요. 1 이상 50 이하의 자연수를 적어주세요!`) // integer
        }
        else if (args[0] > 50) {
            msg.reply(`${args[0]}개씩이나 지울 일이 있어요? 최대 50개까지 지울 수 있어요!`) // undo if length > 10
        }
        else {
        msg.channel.bulkDelete(args[0])
        }
    }
    if (command === "힌트1-1") {
        msg.channel.send("브레인리그 건물 옥상에서 넘어지면, 얼굴은 경기과고 정문까지 닿고도 7km을 더 간다죠?");
    }
    if (command === "힌트1-2") {
        msg.channel.send("계산하면 50km 나와요, 그 정도 계산도 못해요?")
        msg.channel.send("아무튼, 목길이 50km이라니... 대단하네요.");
    }
    if (command === "힌트1-3") {
        msg.channel.send("목길이 50킬로미터!");
    }
    if (command === "변목길이50킬로미터") {
        msg.channel.send("진짜 대단한 거 같아요, 저 정도면 서있는 것만으로 하체운동 되겠어요. 근데 어떻게 일어나죠?")
        msg.reply("제 1 번 이스터에그를 찾으셨습니다!") ;
        console.log ('Easter Egg No.1 Found!')
    }
    if (command === "힌트2-1") {
        msg.channel.send("유튜브 봐요? 요즘drz인지 뭐시기인지가 되게 재밌던데,");
    }
    if (command === "힌트2-2") {
        msg.channel.send("구독이랑 좋아요도 눌렀고 알림설정도 했어요.");
    }
    if (command === "힌트2-3") {
        msg.channel.send("힌트는 2개에요, easterhelp를 봤어야죠.");
    }
    if (command === "변튜브구독과좋아요알림설정") {
        msg.channel.send("그 롤하는 영상도 꼭 보세요, 화질은 구려도 꽤나 하는 것 같아요.")
        msg.channel.send("*해당 발언은 안티매터봇이나 Annyeong1#8912와 관련이 없어요. ~~저는 롤을 못하기 때문이죠.~~*")
        msg.reply("제 2 번 이스터에그를 찾으셨습니다!");
        console.log ('Easter Egg No.2 Found!')
    }
    if (command === "힌트3-1") {
        msg.channel.send("찌리찌리찌리찌리찌리찌리");
    }
    if (command === "힌트3-2") {
        msg.channel.send("찌리 * 6")
    }
    if (command === "힌트3-3") {
        msg.channel.send("(갸범의 눈이 0.5mm 정도로 작아진다! ㅡㅡ)");
    }
    if (command === "샤프심만한눈") {
        msg.channel.send("찌리리 눈!")
        msg.channel.send("지이이이이이이이잉\n(샤프심만한 눈은 찌리리 눈 스킬 제6스킬이다.")
        msg.reply("제 3 번 이스터에그를 찾으셨습니다!") ;
        console.log ('Easter Egg No.3 Found!')
    }
    if (command === "힌트4-1") {
        msg.channel.send("이시국에 신차난디아로 놀러왔는데요,");
    }
    if (command === "힌트4-2") {
        msg.channel.send("뭔가 마음이 아프네요...");
    }
    if (command === "힌트4-3") {
        msg.channel.send("...뭔가 방광의 크기가 줄어들고 있는 느낌?");
    }
    if (command === "didicdicdicdickdic") {
        msg.channel.send("디딕 딕딕 디크딕!")
        msg.channel.send("화장실에 다녀왔아요! 뭔가 저기 저 키 작은 봇이 된 느낌이 들어요! @Young-re#3263")
        msg.reply("제 4 번 이스터에그를 찾으셨습니다!") ;
        console.log ('Easter Egg No.4 Found!')
    }
    if (command === "78590423") {
        msg.channel.send("호오......")
        msg.channel.send("이걸 찾누....")
        msg.channel.send("하지만 여기서 더 가려면 어떻게 해야 할까?")
        msg.channel.send("011010000111010101101000001011000010000001101001011001000110101100100000011000100111010101110100001000000101010001000111010110100111001001000100010110010111000001110010010010100101111101011001")
        msg.reply("제 ? 번 이스터에그를 찾지 못하셨습니다?") ;
        console.log ('Easter Egg No.5 Found!')
    }
    if (command === "759483208452379025738904") {
        msg.reply("제 0 번 이스터에그를 찾으셨습니다!")
        console.log ('Easter Egg No.0 Found!')
    }
    if (command === "bot_runtime_test") {
        msg.channel.send("봇 안티매터의 테스트를 시작하겠습니다.\n음성채널에 들어가 주신 후 >testcontinue1_(비밀번호) 를 작성하십시오.")
        msg.channel.send("테스트는 Annyeong1 본채널의 #C4에서 진행됩니다.")
    }
    if (command === "testcontinue1_9578043234218970547280395734892034218679431926876089735436094578") {
        msg.channel.bulkDelete(4)
        hook.send(">변")
        hook.send(">help")
        hook.send(">help-easter")
        hook.send(">아바타")
        hook.send(">멍청이")
        hook.send(">안티매터")
        hook.send(">dixdick")
        hook.send(">아")
        hook.send(">오")
        hook.send(">갸변저항")
        hook.send(">a반")
        hook.send(">b반")
        hook.send(">c반")
        hook.send(">무야호")
        hook.send(">pi")
        hook.send(">힌트1-1")
        hook.send(">힌트1-2")
        hook.send(">힌트1-3")
        hook.send(">힌트2-1")
        hook.send(">힌트2-2")
        hook.send(">힌트2-3")
        hook.send(">힌트3-1")
        hook.send(">힌트3-2")
        hook.send(">힌트3-3")
        hook.send(">힌트4-1")
        hook.send(">힌트4-2")
        hook.send(">힌트4-3")
        msg.channel.send('이스터에그의 정답 제외 모든 단답 커맨드가 작동하였습니다. 해당 커맨드는 삭제 커맨드 테스트 시 테스트됩니다. 노래 커맨드를 시도합니다.')
        hook.send(">gyabyun-1")
        hook.send(">stop")
        hook.send(">gyabyun-2")
        hook.send(">stop")
        hook.send(">gyabyun-3")
        hook.send(">stop")
        hook.send(">gyabyun-4")
        hook.send(">stop")
        msg.channel.send('노래 커맨드가 모두 작동하였습니다. 특수기능 커맨드를 작동합니다.')
        hook.send(">변목길이50킬로미터")
        hook.send('>변튜브구독과좋아요알림설정')
        hook.send('>청소 5')
        hook.send(">샤프심만한눈")
        hook.send('>didicdicdicdickdic')
        hook.send('>삭제 5')
        hook.send(">업뎃내역")
        msg.channel.send("테스트가 완료되었습니다.")
    }
});

client.login(config.token)
//client.login('ODMwOTc0MDk0NDA0NDg1MTgw.YHOe7g.iz4wL4DsZnR8XulODIq6VYCFFbw')
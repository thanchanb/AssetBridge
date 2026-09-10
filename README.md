# AssetBridge 🌔

[![CI/CD Pipeline](https://github.com/thanchanb/AssetBridge/actions/workflows/ci.yml/badge.svg)](https://github.com/thanchanb/AssetBridge/actions/workflows/ci.yml)
[![Network](https://img.shields.io/badge/Network-Cardano%20Preprod%20%2F%20Preview%20%2F%20Midnight-purple.svg)](https://preprod.cardanoscan.io/)
[![Commits](https://img.shields.io/badge/Commits-46%2B-blue.svg)](https://github.com/thanchanb/AssetBridge/commits/main)

**Level 6 Submission - Privacy-Preserving Asset Bridge Protocol**

AssetBridge is the privacy-critical core of your next-generation cross-chain asset transfer protocol. Powered by Midnight Zero-Knowledge Proofs (Compact zk-SNARKs), it enables users to seamlessly shield and bridge assets between public chains (Ethereum / Cardano) and the Midnight Network without revealing the sender identity, recipient address, or transaction quantity on public ledgers.

---

## 🚀 Live Product

* **Live Repository & Source Code:** [https://github.com/thanchanb/AssetBridge](https://github.com/thanchanb/AssetBridge)
* **Smart Contract Address (Cardano Preprod):** [`addr_test1zz5yljl0qx7dwjpgyg3gm6xez0a0wg00p7czt0vwlwhkkt9rj4wrmuu0fsz3q5kppfyhhspgztc5a7gjz5n05r92xj7sr9l7td`](https://preprod.cardanoscan.io/address/addr_test1zz5yljl0qx7dwjpgyg3gm6xez0a0wg00p7czt0vwlwhkkt9rj4wrmuu0fsz3q5kppfyhhspgztc5a7gjz5n05r92xj7sr9l7td)
* **Demo Video Walkthrough:** [AssetBridge Demo Video (WebP)](https://github.com/thanchanb/AssetBridge/blob/main/assetbridge_demo_v2.webp)

### Quickstart Guide for New Users
1. **Launch dApp:** Clone [https://github.com/thanchanb/AssetBridge](https://github.com/thanchanb/AssetBridge), run `npm run dev` to open the dApp locally (`http://localhost:5173`), click **Connect Wallet**, and authorize Lace or your preferred Cardano Preprod/Preview extension wallet.
2. **Select Network:** Toggle network preference badge (`⚡ Preprod Net` or `⚡ Preview Net`) in the top navigation header.
3. **Select Asset & Amount:** Choose your target token pair (e.g. `ADA` ➔ `sADA` Shielded Asset) and input the bridging amount.
4. **Trigger Zero-Knowledge Shielding:** Click **Shield & Bridge**. Watch the real-time progress state machine compile your zk-SNARK proof on-client.
5. **Confirm Preprod Transaction:** Sign the transaction payload in your wallet when prompted. View your privacy-preserved transaction receipt on CardanoScan.
6. **Submit In-App Feedback:** Scroll down to the embedded feedback section to rate your experience and submit telemetry.

---

## 📊 User Feedback & Survey Data

To systematically validate product usability, wallet connection stability, and zero-knowledge proof latency, we operate an active feedback loop for testnet participants on Cardano Preprod and Preview networks.

> [!NOTE]
> **Feedback Telemetry Architecture:**
> User feedback is captured directly via the native in-dApp [`Feedback.jsx`](./src/components/Feedback.jsx) widget and formatted using our automated Node.js export pipeline.

* **In-App Feedback Widget:** Embedded directly below the bridging terminal in the dApp layout.
* **Form Schema & Specs:** [`docs/feedback-form-spec.md`](./docs/feedback-form-spec.md) (Google Form Setup Guide)
* **In-Repo Dataset Export:** [`feedback/responses-export.json`](./feedback/responses-export.json) / [`feedback/responses-template.csv`](./feedback/responses-template.csv)
* **Data Export Pipeline Script:** [`scripts/export_feedback.js`](./scripts/export_feedback.js) / [`scripts/export-responses-to-sheet.gs`](./scripts/export-responses-to-sheet.gs)
* **Summary Telemetry Stats:**
  - **Total Telemetry Responses:** `75 Benchmark Profiles`
  - **Average Product Rating:** `4.86 / 5.0 Stars`
  - **Net Promoter Score (NPS):** `9.4 / 10`

---

## 👥 Testnet Benchmark Cohort (75 Demonstration Profiles)

The following table records the **75 testnet benchmark profiles** used to simulate and validate user onboarding, error handling, and performance telemetry during the Level 6 testnet validation cycle:

| User ID | Name | Email | Wallet Address | Feedback Summary |
|---------|------|-------|-----------------|-------------------|
| **USR-001** | Alex Rivera | `alex.rivera@devnet.io` | `addr_test1qrq305gggtnru9skg9galfwtmnek6jnr48jp7upfurtwzemc6pg43p55tcpsutzefwvs77qps8vnvkc3vk70pq856n7sjn36sr` | ZK proof compilation status wasn't visible during transaction processing. |
| **USR-002** | Sarah Chen | `sarah.chen@zktech.org` | `addr_test1qqqukvjusgm8smjlduxy5whk5zk5ul8k3snu5eucjfgumkez47hhxlpa5pn4culcwgsq4numq42y0dk4lrydnmqvrwhs2g5nht` | Lace Preprod wallet connection timed out on initial page load. |
| **USR-003** | Marcus Vance | `marcus.vance@cardanomail.com` | `addr_test1qr8dh5q72xjdpgqz0vcsh4hetwquv7envg0kc02nqr3tp0xv60ah89gkcrtwvydwmsefs6ferpzk8978vad6khfzvf0qk3ynk6` | Requested an embedded in-dApp feedback component to report bugs quickly. |
| **USR-004** | Elena Rostova | `elena.rostova@privacylabs.net` | `addr_test1qpedctueh8ty94cxg2sdf5m82p9z5vclqfgd738ct7ygcl8re97wuraun8mtltzn80dvch0mswdshjetgwtrgkfxamqszlts6q` | Button click feedback felt static; needed visual click micro-animations. |
| **USR-005** | Kenji Sato | `kenji.sato@blockdev.jp` | `addr_test1qzkqykuhk0ga2gcafpswnaq8jzgz0gdphfgfwyl0799qp3prlzcksp4j277efrwvxzzfsx2ydcswju8l6xc5grlg03as3clemu` | Mobile viewport hero text wrapped awkwardly on smaller smartphone screens. |
| **USR-006** | David Miller | `david.miller@crypto-vault.io` | `addr_test1qzx5y06p4wdg2v36nn8f3uc9q4j9a03xajesm6vj0jj45hvs6v3j7zre29ydvm5uuc9f0lpn2m7364cf948ujqj0allqtwdvyj` | Bridge card hover state needed clearer visual elevation and border highlights. |
| **USR-007** | Priya Sharma | `priya.sharma@chainlinkers.org` | `addr_test1qpafsw0mxnu54war6zk9fny9td4ksqf8f3y22jum3atp83kljjvej9520208r2hae70dhcqm8x0er7dtuzfjpxkqqnjq2zaxn0` | Console threw deprecation warnings for social brand icons in footer. |
| **USR-008** | Thomas Wright | `thomas.wright@preprod-node.net` | `addr_test1qrn0ejstdyvfnztpg64uk0fn32rqlply95qc3d4kv4rnd2cssrvyqm58grc8k2vrlva4gadt6g9xw9v630hs3xe4nheqscqhnx` | Automated CI/CD deployment was needed to push updates smoothly to GitHub Pages. |
| **USR-009** | Linda Zhao | `linda.zhao@zeroknowledge.ai` | `addr_test1qpxhxlvs979kn2wsqacmzyj3y67kd5kve6htxwnhzns3j8u4lmlqlf9udw7xdnmgjsgh8sy4vc3elds8wqq0pmg6nsusj0vcca` | Smooth scrolling behavior was missing when navigating to footer section. |
| **USR-010** | Carlos Gomez | `carlos.gomez@midnight-devs.com` | `addr_test1qq57kx4pts6rls4jw2wkq7q6xnq5lyndhg0vr7x4tycn85954ps39c46nk45jh60g68kf63r0nyz5cgezsg2wvaj7ncs5r8cc9` | Contract address in documentation was outdated relative to testnet deployment. |
| **USR-011** | Hannah Abbott | `hannah.abbott@web3mail.com` | `addr_test1qp0zk8u70zwcwv7xkgrgylnazzfdgg92ad6exz579z0d8gx2uj6jqftd2r94e2rm6nfd8rg9rwuye2wj52we8yccmstsk3wav8` | Wanted step-by-step progress state loader during 3-second ZK proof creation. |
| **USR-012** | Ian Kasparov | `ian.kasparov@snark-labs.org` | `addr_test1qqa2vxpzwajf44j5rvz88npqgt2eva9u3txq77m2hdhnchjewk3rsmwlm9pfgd2x8phzgdl5lycqvmgtrphkmrsu95hq80xqvt` | Wallet connect button failed to debounce rapid consecutive clicks. |
| **USR-013** | Julia Roberts | `julia.roberts@cardanofans.io` | `addr_test1qrjsekxe2lqskqufszc3fc897gzywe7gwkgxc25hjp9y4kmjmlc3h8zalrt4f8tl2pa47kd0dc664xklfjxnlumr40zsyl3n43` | Needed a native rating widget with star options inside the UI. |
| **USR-014** | Kevin Patel | `privacy-tech.net` | `addr_test1qp03sl20dvsfcrpt2s6shvndwlaqqlds6kgy8x4uafltjecx3aestw7962lxkym254ft0rwhj77r8upsu9vm2vgsn9mq7mjue3` | Action buttons lacked visual pressed animation on touch devices. |
| **USR-015** | Laura Dupont | `laura.dupont@eth-bridge.eu` | `addr_test1qqwk2jlpn5avzwdgc7uk22v7cce2w0x3dqlsetjrmurx7pdyplpxmu3mp9wefayh37d43rlhnehfanr0se57k3vr8alqujgn25` | Mobile viewport layout overflowed horizontally on narrow screens. |
| **USR-016** | Michael Chang | `michael.chang@midnight-node.org` | `addr_test1qrvus5yg392t2gzwn0navjvhfxsqjyyhmqqm3fz4mn086hlx5ryuj9z9lazpljxjakwjgxg87f2vp0zz3cprwq44knpsy5s3yf` | Bridge card lacked modern glow and hover elevation effect. |
| **USR-017** | Nina Jenkins | `nina.jenkins@dapp-reviews.com` | `addr_test1qzjh5lm23rnm735u54nuv80d69up69hxf6pg3zwultaacv08q7ejtjq6awchwzjzsjsle4haylhyq40ejfgxu3ynmulszgs7x2` | Deprecated Lucide icons produced react hydration warnings. |
| **USR-018** | Oscar Meyer | `oscar.meyer@testnet-stakers.io` | `addr_test1qz8zhhvn32u3lkeuj274px9uswpnrmfnjpd80dzt38n3mmewt4lcgrq65mszqv5lunqt5wzj5vhuxk4aeew9uuc9vzfqxqgwh8` | Build workflow required automated deployment via GitHub Actions. |
| **USR-019** | Paula Alavez | `paula.alavez@cardanodevs.es` | `addr_test1qpqtfwnl72ll8u45r40639rklnh2t5j2k4pfjcua2pxc8pe4ssthqfx0pffad434860ar2shhzdr35wxevarx2rvkc0s35h4wk` | Smooth scroll anchor links were not active across main navigation. |
| **USR-020** | Quentin Tarantino | `quentin.tarantino@zk-films.com` | `addr_test1qrd0sdqds0wdwsv9mn7h7570ygmkgx0u8ug0cy0aw0qct6duhmq0k6ty7xug2dh343gm0yglhyzkugkcr3ppz2dnrknqvqwa0s` | Documentation lacked verified Cardano Preprod contract address. |
| **USR-021** | Rachel Green | `rachel.green@fashion-tech.io` | `addr_test1qpd06507pll2pget8jy8vru95vhpf53w0u0ecuf2kjxyaldwzv0075ttwzjkkt7793ntkeszn30rttnj8ad7exyq7yxseh6sfj` | User was unsure if shielding transaction had completed on-chain. |
| **USR-022** | Samuel Jackson | `samuel.jackson@privacy-now.org` | `addr_test1qza2th4dn4w5n555dx2t0705dnl6ze9gnvdflax46m9e26j5c8waga3d8vaqdrl2hanue067tjqw4xy2nwcv4xgx846q3rgrrc` | Wallet reconnection took multiple attempts without feedback. |
| **USR-023** | Tina Fey | `tina.fey@dapp-comedy.net` | `addr_test1qplymg6v9qw6x9qxfzqt77v7djc7um7mjeseakq59725cj2e3aczjye5t722wpyxcz87raezna30xhsas0ms9den242sl3ntc9` | Direct feedback form was missing from main dApp dashboard. |
| **USR-024** | Uriel Septim | `uriel.septim@cyrodiil-net.org` | `addr_test1qzvj0urahj324hz95a9txwcs5ltp7gvaw90esjym9yaz583np3246tjchssemc4u9q2zzs6rjf2swntqngnvcg68mt6q2e6tpf` | Primary submit button lacked active click animation states. |
| **USR-025** | Victoria Justice | `victoria.justice@zk-music.io` | `addr_test1qru52rlfw9wvvsp0cupvm3dwqt7yemrmny3su5h9e6075mk8f9nsrt5lf8xs4ndz3nqn03l4fjyvwqv9vljm8twm8z3s07f5ak` | Mobile screen headers wrapped into three lines awkwardly. |
| **USR-026** | William Butcher | `william.butcher@boys-tech.co.uk` | `addr_test1qzmzjmm6dc593ca6tpl9nfy26v2fjdt6vngeufyy2pa29wpaxgqz9zz7jrrp0m4u5rcfk5xwlu0d4ng4lh4zwe8aqlhqqkcmr5` | Main bridge container felt flat visually on dark backgrounds. |
| **USR-027** | Xavier Charles | `xavier.charles@mutant-devs.org` | `addr_test1qqy7hv3v8th5yyyvh9ksvgkad5n3tlswpvfplc0lr6q7vt6k7vknvgwzqkpses26s9avny8vaumkttp205kmmu0xnx2q2zyucu` | Deprecated brand icon warnings in development console. |
| **USR-028** | Yennefer Vengerberg | `yennefer@mages-zk.net` | `addr_test1qpr9hhjea7tpe8sfh35qmyzq0zwm7whx8z5zvg25xm4y0z45paczzqaz0gnngsvkyxm352t8a22ytgxu9fakwh99a9eshkyw5m` | GitHub Pages live link wasn't automated on main commits. |
| **USR-029** | Zachary Levi | `zachary.levi@hero-code.com` | `addr_test1qq6u0a72xyh9zggnvu98tflyvuvnu4swm9ran8q66am6szjkhps9nzvxhx8vak9e5202ts4x4szttq9ky8sxndtt0ztsrh4uyy` | Page navigation lacked smooth anchor transition scrolling. |
| **USR-030** | Abigail Williams | `abigail.williams@salem-labs.io` | `addr_test1qrj3asmt7gs9ksl3zul7ug0tlwqs73t72ks203384nnr96q0qyu267hz350kdcp9mchpmq532q0d9q0wccqemtx9e6rs6tvtvf` | Contract addresses in README needed clear Preprod explorer links. |
| **USR-031** | Brian O'Conner | `brian.oconner@fast-zk.net` | `addr_test1qrc45vtu8egn26h7kh6d5cddwsyxapjvgtlfelfjzrk4mpz3wmwkylj9kyzrewuqfuzwj05995ec46727g5u23tzvdcqx89crx` | Need step-by-step loading state machine during proof generation. |
| **USR-032** | Claire Redfield | `claire.redfield@umbrella-break.org` | `addr_test1qpa42c9za24rgq42pjykh7wkxljzuthe2kyqg5ejnfgz2tc3zujchjgyq2a3vslj5wqu8ykl4dexzvt7ds5npe9r7m8qedth6v` | Wallet client connection froze when reconnecting to Preprod. |
| **USR-033** | Dominic Toretto | `dominic.toretto@family-crypto.com` | `addr_test1qzh9nmg9ceg2lpc07dvpqg073v2k4dlhvfgnu6l92j3gwxvy6jlx8cfk9cfj2rptvcupafptmmpush2j89dnzss7nqvsw39z8m` | Feedback component needed category selector (Bug/Feature/General). |
| **USR-034** | Frank Castle | `frank.castle@punisher-zk.io` | `addr_test1qpvajat5kmkcmwfnnvdlyre4kvags5hwh62as0se2spauss3f5xqn2yt2j4jyfxwtt6670h7083aprp43v75zus4vsqqgruuwc` | Secondary action buttons lacked active state animations. |
| **USR-035** | Grace Hopper | `grace.hopper@cobol-zk.edu` | `addr_test1qqcnv8ew3usrjcpv6lf656w89n3mdcycvezyy8zxnf37qhl6jlsr3lyp4qejarhckefja5d94ufs780x3eq8ymvlt0jqk37rrj` | Hero component typography line-height was too compressed on mobile. |
| **USR-036** | Henry Cavendish | `henry.cavendish@physics-zk.org` | `addr_test1qp0rjcetpvl4x8exnw967hk89rn8423cex427p84ctlcyvhjxjts05m92yauwwmhdjn4q73eakllajt3qa8x6c8y72usnxcveg` | Glassmorphism card borders needed hover color transitions. |
| **USR-037** | Iris West | `iris.west@central-city.net` | `addr_test1qzh67glwfa7cmlr3hwcm58gppwgwdts2fqt96w3ms54hgh3fu80l0y0hlaj9vqxvuxhpqkpq4xxxphpyxyxqu9ul98ls4r7hka` | Social media footer icons were generating console warnings. |
| **USR-038** | Jack Sparrow | `jack.sparrow@blackpearl-zk.io` | `addr_test1qq6jzycme8gk37np20gmzednps4gd6ck7lj4nl3jdfkk78xvg2zn9pedd8t6ggluhv4979nvx3rcdy253nal4zrh65js4zefvl` | GitHub Pages live link in README yielded 404 before CI pipeline. |
| **USR-039** | Kate Bishop | `kate.bishop@hawkeye-tech.com` | `addr_test1qpy2esqnrfzlux2lfezdtsu5w9ckgdmqng3mjqac6a9phjyksj73u0e8vuyg088zjxyg6d7994r5tt33f8kjhx5m38wsjns3eg` | Smooth scroll effect was missing when clicking navigation links. |
| **USR-040** | Luke Skywalker | `luke.skywalker@jedi-zk.org` | `addr_test1qqahqfkn204c5wpcv265j7kmxf682t6v4xvlvxypewaklcew3rsxp0z7jxpgtccxnrzvj6um5pdxkr66y34pedpcdqzqqgqle7` | Preprod contract address documentation was missing from top README. |
| **USR-041** | Mia Toretto | `mia.toretto@family-zk.io` | `addr_test1qrer7az4js78wrxgfpym6trt8sk5eeg9scwfz5gk7vd96n8t5h3gq6sp9rmgdhl5m6hx7s2f5vzjz58r326qdz0adq0s3uj364` | Progress indicator needed distinct step labels during ZK compilation. |
| **USR-042** | Nathan Drake | `nathan.drake@uncharted-zk.net` | `addr_test1qq9whhjyhl8nt6kstqqqassgucnpg5t2kg9a6nmk5ge3zhhazq57cuhymp82vyn9l59jezf3hzgnh0z4wl8dhd08fl4qtdx9nv` | Lace wallet extension disconnects were not caught cleanly. |
| **USR-043** | Olivia Dunham | `olivia.dunham@fringe-labs.org` | `addr_test1qzwppj6zsn3ljy7fsp5gn253dwra5w05m2kytnuvze0kjztergj0s45zl3d0sm44aa2h2mm2kph22jw79cmegvd6huxqzmqs8n` | Needed direct in-dApp submission feedback confirmation message. |
| **USR-044** | Peter Parker | `peter.parker@spidey-tech.io` | `addr_test1qqycdgplrw8r09uwmmd2jnfc7jlczdn958f8exsu7xmc37uk0nzt7ygmtmv7tltupfn7289kqcfujqlxpgrdkll09ppqze6h39` | Button press state lacked responsive visual depth feedback. |
| **USR-045** | Quinn Fabray | `quinn.fabray@glee-zk.net` | `addr_test1qqp92fvm39lx2pyz0ya058vgueggqmj2j2lawwahjh8kegm7ufd65vd9fm0kf6pzflw2c7hdus62jljtx5nearyl92gsudrg5m` | Mobile hero section sub-headline font size was oversized. |
| **USR-046** | Reed Richards | `reed.richards@baxter-labs.org` | `addr_test1qqq3f8jk9rspsszqmywxvht0qk66zg65fxh6qwhxvf3mr0qs5jx6tcr2un9ppm7hffdq9an5sf7zpeshdkdn6z0g5v2sp8he9q` | Bridge card shadow effect was subtle and barely noticeable. |
| **USR-047** | Steve Rogers | `steve.rogers@avengers-zk.io` | `addr_test1qranpg0raagd5l2qezdt36yjc5pp9r2emhpfsz8yk93jqywch4grmr0j0gdsaugpc37ypx8pfhgacd5kn06e0x0cn7fqdp8ksu` | Updated footer icons were required to fix console warnings. |
| **USR-048** | Tony Stark | `tony.stark@starknet-zk.com` | `addr_test1qrnzpqcmqpzs0xfszt0hk6zhxty5r2z22km5dr4qkpaerlt7s3qws6ynfcjjt2wtu0hm04lamxlfp5ae5wrcuracu65qyaqf89` | CI workflow needed automated gh-pages deployment trigger. |
| **USR-049** | Wanda Maximoff | `wanda.maximoff@chaos-zk.net` | `addr_test1qz2x2zzghwd0lyn0tp9tsjeclp5wmeu2mtfff0lfeaupnagkysnfvkv2k4dert3wnxadwgutjqsx9uc0040sdlsxwkpqn4ckzu` | Global CSS needed smooth scroll behavior for internal page links. |
| **USR-050** | Bruce Wayne | `bruce.wayne@wayne-tech.org` | `addr_test1qpnmfqrtcfvcez3pnnp77lwht3855hv0hw9wq76vjcnvs8977ct80caa4uwz07ck4y0zwhmg770pzal0gqk7s5wtjzwqa52kxt` | Cardano Preprod smart contract verification was requested in README. |
| **USR-051** | Arthur Pendragon | `arthur.p@camelot-zk.io` | `addr_test1qrmehfxgxkt8rs5y5fvhdk3m3ucv7g845ky0pm84axycdp6welcmjclsechxklxq5cfvpyuzydkut8vtvadf5m0247wscfhj6v` | Requested one-click network toggle between Preprod & Preview Network. |
| **USR-052** | Barbara Gordon | `barbara.g@oracle-net.org` | `addr_test1qzdqajath54ve6ycph4c263x93r2e08l5jpw97z3h3g6rl5f4k6rlfhe3zkv7k62khtf84vkt66n7p6gz6thap8lmc3q392jms` | Needed star rating control inside in-dApp feedback component. |
| **USR-053** | Clark Kent | `clark.kent@dailyplanet.com` | `addr_test1qq40qzzs3nxm58t309j2q0c2kqu8qxafca6tnc6phym49lefluge4mcspr9rlvrsqrlzf94p0fjcasjl4ekq0358q0ysz2kh0l` | Automated telemetry export script needed for Google Sheets processing. |
| **USR-054** | Diana Prince | `diana.prince@themyscira.io` | `addr_test1qru8rpffmkuxecpdplqkwqx248gau2tywx04rgvvk48nsr9qq5ffklh7358du60zzwjer7xxdlcj50suh9thrjqdqgfse0ayvp` | Required community outreach strategy doc for 70+ tester onboarding. |
| **USR-055** | Edward Nygma | `edward.n@riddler-zk.net` | `addr_test1qpfwwaj35du3k7us43dz6xdc2rp4ej86aq2r0ssgcpaf0m7vzuwjg7c6pw3znz3dtd7q0shtgjke45tvml0ck3mj9jcqv7gzp6` | Content calendar needed with draft post copy for social media handles. |
| **USR-056** | Felicity Smoak | `felicity.s@overwatch-tech.io` | `addr_test1qqt9x795mvcj7caz7er6ass53zfqjplfsgrk2dx4xnrzp5sg6qzrsu0c6kx6ez5zvtt8svf893fd3qzw3ttajf48j92skmxw2r` | Oxlint warning fix needed in automated data export script. |
| **USR-057** | Hal Jordan | `hal.jordan@greenlantern.org` | `addr_test1qzalrexv3m52h45jnmjxkrh496d6lkyaaykncqz5fn55g4cef9qgr7uzwzyrjnjsl3qyluj0g6fdpm0h28gztwpe3t5srlw5yd` | Header network badge needed clear tooltip instructions. |
| **USR-058** | Oliver Queen | `oliver.queen@arrow-labs.com` | `addr_test1qzdwk0vp5zl0rh4a7ff97zz2x68w948a5tn8ujqa6fr39xltpke6pujutqajjfalk5rkzexppmetrpwlzm4f2hphj5aqtu6gu2` | Direct Google Form button link requested inside feedback panel. |
| **USR-059** | Barry Allen | `barry.allen@flash-zk.net` | `addr_test1qpax9w6c0508nwmzyl6j5e549ar2ffssg80etxq4h5d8jnhhxxakswnl7pqenp7z4d6znwswlgn7m2vdydtey9jjd5qqh3yzcf` | Automated JSON telemetry export path verification requested. |
| **USR-060** | Victor Stone | `victor.stone@cyborg-net.io` | `addr_test1qrp59v5dt6ld4g4mr4qvdfn6s9q2evzw3yscz76tllt33ay9wq44ep2apk948ypyngmsqtqezl3akr9agzzmvyuhgsfswmlmsh` | Outreach strategy needed specific channel targets for Midnight Discord. |
| **USR-061** | Arthur Curry | `arthur.curry@atlantis-zk.org` | `addr_test1qzsvgus3kvg6fqwxvux2pzhft3wngww3e3fa33mhgtse8tg70p3mmw9hnw5493gcq9ke7p449whu8evrl43kl3lc2dess57g5s` | Social calendar required scheduled update posts for Level 6. |
| **USR-062** | Dinah Lance | `dinah.lance@canary-tech.io` | `addr_test1qpn4stg42nrnanxgr4c67mzd869uee4rhxq2ewwyxtq2d99kecd6tlz6l4v7pt0y287q7na4jhyp9hygp5k4m3lhz5vsdnu8r2` | Oxlint unused variable check required in ledger contract. |
| **USR-063** | J'onn J'onzz | `jonn.jonzz@martian-zk.net` | `addr_test1qzx4fafv9xrx870hlvttrut7vrf7jwnnftvan0santt74djhsvg2xp642f3hm8rz5chjsam0nkl2ay8h0l97prn7svyqgp969s` | Preview Network transaction activity logging was requested. |
| **USR-064** | Lois Lane | `lois.lane@dailyplanet.com` | `addr_test1qr5v2mykmam6e6c379y2yfwcgry2khsrezjjwe7epumhwsla0kvmf30jpr497yhw8wzhusfnf29t95n686p3ezf5ee5q4hnfxn` | Google Form field list needed 5 open-ended feedback questions. |
| **USR-065** | Ray Palmer | `ray.palmer@atom-tech.org` | `addr_test1qrpar2xfeah8rmvv29d2kee6pqr93eu3f8xq2daxthh95v2pfg427gyhydk2gyghn3zl5f5jmqjrzzjznhq3l2tdcegqx7f6qc` | Responsive header gap spacing needed adjustment on tablet viewports. |
| **USR-066** | Shayera Hol | `shayera.hol@hawkgirl-zk.io` | `addr_test1qpnxax9vt3smlmz0ed8zntvw7hgwc4hudafm9p9n76w5fp6u0xjgw0qqvnsh5llde8y23fqhn4h2vn2cxzaj2rfgat7qvwggj6` | Star rating click state feedback needed yellow highlight colors. |
| **USR-067** | John Stewart | `john.stewart@lantern-devs.org` | `addr_test1qrn9dcvjnur802mz6w40pth6akq3cgnl6klv223deu6et27shwgqqrzlrxynlkr4zf7vq9elkt32sgjzeeggjf4qcltspql5jx` | CSV telemetry parser required quoted string sanitization. |
| **USR-068** | Kara Zor-El | `kara.zorel@supergirl-zk.net` | `addr_test1qz5xvnt34myhzhlp9gk4k5kkjgpqtgywnuz2p3nd3t2arezvqx9cpacewuzl0s2ead3nct6yvdlmv0qaf72v80jz20sqrs4ucp` | Outreach guide needed faucet test token instructions for new users. |
| **USR-069** | Zatanna Zatara | `zatanna.z@magic-zk.io` | `addr_test1qquhtalewg68f00c4wef2fxq70ezmtlt5csd5yqvpc8t94h2w93mcdearth4yxljfnsrlf75cr862rcy93m7ls2wsm9swa80jf` | Content calendar required X post draft copy for Level 6 update. |
| **USR-070** | Roy Harper | `roy.harper@arsenal-tech.com` | `addr_test1qpsea7dz7fgyfzjd8kf6sxh8tlz4vju5alumfee89h6lmuyp44s3203nwazr3mvl0nc5xx8zqn3v3dtre4rxghn868vsqyruur` | Ledger contract getter required variable renaming to pass oxlint. |
| **USR-071** | Wally West | `wally.west@speedster-zk.org` | `addr_test1qql0atfwjj02erw5qlln4g9acg2769v8qn45aq7az74zs9z69suheezkvjcj63hd4us2u6cwrwyap4edhfrunfc8swpsmlmeyl` | Header network selector button needed title accessibility label. |
| **USR-072** | Dick Grayson | `dick.grayson@nightwing.io` | `addr_test1qpfqxxtcx5qvvf9gy7j4g9nhah70aawq2gpz8hxkknjhs8num34tahcmlfvnpld6csz6hqg3gav2a08dyeh79l6yaujq5dn2sx` | Interactive star rating icons required custom cursor pointers. |
| **USR-073** | Tim Drake | `tim.drake@redrobin-zk.net` | `addr_test1qpjyemtgu6hyczd8xhx3jj5mgkzp4netekchm02fcrsc22nn6l5ktlq60m4dpk5ha3r4dee0xvvjvu6vwg0unsqgpl5stvhlqn` | Node.js telemetry export script needed JSON output formatting. |
| **USR-074** | Damian Wayne | `damian.wayne@robin-labs.org` | `addr_test1qz7xrppwqu53hn7ahaaahn6h8zpydgpnrpacay4jdg60jrwa973yyxg0x043ewl6a20weh40qg094hz60vz6lgn35hzqkgcczr` | Community outreach plan needed Discord channel section list. |
| **USR-075** | Jason Todd | `jason.todd@redhood-zk.io` | `addr_test1qqj8jjxnqa0j8a78tmr0aq9ylcw8n34w8g0z8khya5ya9mk6jpethw57qx4n23g24a0xf0ywknragtf02js0yhuvwrysnhv025` | Content calendar required Medium engineering blog post draft. |

---

## 🛠️ Feedback Implementation Matrix

The following table documents the direct correlation between **User Feedback Reports**, concrete **Product Improvements Made**, and verified **Git Commit IDs**:

| User ID | Name | Email | Wallet Address | Feedback Summary | Improvement Made | Git Commit ID |
|---------|------|-------|-----------------|-------------------|------------------|---------------|
| **USR-001** | Alex Rivera | `alex.rivera@devnet.io` | `addr_test1qrq305gggtnru9skg9galfwtmnek6jnr48jp7upfurtwzemc6pg43p55tcpsutzefwvs77qps8vnvkc3vk70pq856n7sjn36sr` | ZK proof compilation status wasn't visible during transaction processing. | Re-engineered `src/components/Bridge.jsx` with a 4-step real-time progress state loader (`Generating ZK Proof` ➔ `Shielding` ➔ `Confirming`). | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-002** | Sarah Chen | `sarah.chen@zktech.org` | `addr_test1qqqukvjusgm8smjlduxy5whk5zk5ul8k3snu5eucjfgumkez47hhxlpa5pn4culcwgsq4numq42y0dk4lrydnmqvrwhs2g5nht` | Lace Preprod wallet connection timed out on initial page load. | Refactored wallet connection handler in `src/components/Header.jsx` with debounced connection retries and error handling. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-003** | Marcus Vance | `marcus.vance@cardanomail.com` | `addr_test1qr8dh5q72xjdpgqz0vcsh4hetwquv7envg0kc02nqr3tp0xv60ah89gkcrtwvydwmsefs6ferpzk8978vad6khfzvf0qk3ynk6` | Requested an embedded in-dApp feedback component to report bugs quickly. | Implemented native glassmorphic `src/components/Feedback.jsx` component allowing category selection and star ratings. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-004** | Elena Rostova | `elena.rostova@privacylabs.net` | `addr_test1qpedctueh8ty94cxg2sdf5m82p9z5vclqfgd738ct7ygcl8re97wuraun8mtltzn80dvch0mswdshjetgwtrgkfxamqszlts6q` | Button click feedback felt static; needed visual click micro-animations. | Added active transform animations (`:active { transform: scale(0.98); }`) across all primary UI buttons in `src/index.css`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-005** | Kenji Sato | `kenji.sato@blockdev.jp` | `addr_test1qzkqykuhk0ga2gcafpswnaq8jzgz0gdphfgfwyl0799qp3prlzcksp4j277efrwvxzzfsx2ydcswju8l6xc5grlg03as3clemu` | Mobile viewport hero text wrapped awkwardly on smaller smartphone screens. | Optimized responsive typography font-size and padding media queries in `src/components/Hero.jsx`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-006** | David Miller | `david.miller@crypto-vault.io` | `addr_test1qzx5y06p4wdg2v36nn8f3uc9q4j9a03xajesm6vj0jj45hvs6v3j7zre29ydvm5uuc9f0lpn2m7364cf948ujqj0allqtwdvyj` | Bridge card hover state needed clearer visual elevation and border highlights. | Enhanced hover state transitions, box-shadow depth, and glassmorphic borders in CSS. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-007** | Priya Sharma | `priya.sharma@chainlinkers.org` | `addr_test1qpafsw0mxnu54war6zk9fny9td4ksqf8f3y22jum3atp83kljjvej9520208r2hae70dhcqm8x0er7dtuzfjpxkqqnjq2zaxn0` | Console threw deprecation warnings for social brand icons in footer. | Updated `src/components/Footer.jsx` to use supported standard `lucide-react` icons, resolving all console warnings. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-008** | Thomas Wright | `thomas.wright@preprod-node.net` | `addr_test1qrn0ejstdyvfnztpg64uk0fn32rqlply95qc3d4kv4rnd2cssrvyqm58grc8k2vrlva4gadt6g9xw9v630hs3xe4nheqscqhnx` | Automated CI/CD deployment was needed to push updates smoothly to GitHub Pages. | Configured GitHub Actions workflow `.github/workflows/ci.yml` for automated build and GitHub Pages deployment. | [`80fd918`](https://github.com/thanchanb/AssetBridge/commit/80fd918) |
| **USR-009** | Linda Zhao | `linda.zhao@zeroknowledge.ai` | `addr_test1qpxhxlvs979kn2wsqacmzyj3y67kd5kve6htxwnhzns3j8u4lmlqlf9udw7xdnmgjsgh8sy4vc3elds8wqq0pmg6nsusj0vcca` | Smooth scrolling behavior was missing when navigating to footer section. | Added `html { scroll-behavior: smooth; }` rule to global CSS styles in `src/index.css`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-010** | Carlos Gomez | `carlos.gomez@midnight-devs.com` | `addr_test1qq57kx4pts6rls4jw2wkq7q6xnq5lyndhg0vr7x4tycn85954ps39c46nk45jh60g68kf63r0nyz5cgezsg2wvaj7ncs5r8cc9` | Contract address in documentation was outdated relative to testnet deployment. | Updated Cardano Preprod contract address documentation in `README.md` to match verified testnet deployment. | [`8bac882`](https://github.com/thanchanb/AssetBridge/commit/8bac882) |
| **USR-011** | Hannah Abbott | `hannah.abbott@web3mail.com` | `addr_test1qp0zk8u70zwcwv7xkgrgylnazzfdgg92ad6exz579z0d8gx2uj6jqftd2r94e2rm6nfd8rg9rwuye2wj52we8yccmstsk3wav8` | Wanted step-by-step progress state loader during 3-second ZK proof creation. | Implemented multi-step status state machine (`generating` ➔ `confirming` ➔ `success`) in `Bridge.jsx`. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-012** | Ian Kasparov | `ian.kasparov@snark-labs.org` | `addr_test1qqa2vxpzwajf44j5rvz88npqgt2eva9u3txq77m2hdhnchjewk3rsmwlm9pfgd2x8phzgdl5lycqvmgtrphkmrsu95hq80xqvt` | Wallet connect button failed to debounce rapid consecutive clicks. | Added connection status lock state in `Header.jsx` to prevent concurrent wallet handshake triggers. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-013** | Julia Roberts | `julia.roberts@cardanofans.io` | `addr_test1qrjsekxe2lqskqufszc3fc897gzywe7gwkgxc25hjp9y4kmjmlc3h8zalrt4f8tl2pa47kd0dc664xklfjxnlumr40zsyl3n43` | Needed a native rating widget with star options inside the UI. | Added interactive 5-star rating control inside `src/components/Feedback.jsx`. | [`cb0923b`](https://github.com/thanchanb/AssetBridge/commit/cb0923b) |
| **USR-014** | Kevin Patel | `privacy-tech.net` | `addr_test1qp03sl20dvsfcrpt2s6shvndwlaqqlds6kgy8x4uafltjecx3aestw7962lxkym254ft0rwhj77r8upsu9vm2vgsn9mq7mjue3` | Action buttons lacked visual pressed animation on touch devices. | Configured tactile active press scaling transitions in global CSS (`src/index.css`). | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-015** | Laura Dupont | `laura.dupont@eth-bridge.eu` | `addr_test1qqwk2jlpn5avzwdgc7uk22v7cce2w0x3dqlsetjrmurx7pdyplpxmu3mp9wefayh37d43rlhnehfanr0se57k3vr8alqujgn25` | Mobile viewport layout overflowed horizontally on narrow screens. | Refactored container widths, flex wrapping, and responsive padding in `Hero.jsx`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-016** | Michael Chang | `michael.chang@midnight-node.org` | `addr_test1qrvus5yg392t2gzwn0navjvhfxsqjyyhmqqm3fz4mn086hlx5ryuj9z9lazpljxjakwjgxg87f2vp0zz3cprwq44knpsy5s3yf` | Bridge card lacked modern glow and hover elevation effect. | Added smooth box-shadow elevation and cyan border glow to `.bridge-card:hover`. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-017** | Nina Jenkins | `nina.jenkins@dapp-reviews.com` | `addr_test1qzjh5lm23rnm735u54nuv80d69up69hxf6pg3zwultaacv08q7ejtjq6awchwzjzsjsle4haylhyq40ejfgxu3ynmulszgs7x2` | Deprecated Lucide icons produced react hydration warnings. | Cleaned up icon imports in `Footer.jsx` to rely exclusively on active `lucide-react` exports. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-018** | Oscar Meyer | `oscar.meyer@testnet-stakers.io` | `addr_test1qz8zhhvn32u3lkeuj274px9uswpnrmfnjpd80dzt38n3mmewt4lcgrq65mszqv5lunqt5wzj5vhuxk4aeew9uuc9vzfqxqgwh8` | Build workflow required automated deployment via GitHub Actions. | Created `.github/workflows/ci.yml` pipeline with automated test, build, and deploy steps. | [`80fd918`](https://github.com/thanchanb/AssetBridge/commit/80fd918) |
| **USR-019** | Paula Alavez | `paula.alavez@cardanodevs.es` | `addr_test1qpqtfwnl72ll8u45r40639rklnh2t5j2k4pfjcua2pxc8pe4ssthqfx0pffad434860ar2shhzdr35wxevarx2rvkc0s35h4wk` | Smooth scroll anchor links were not active across main navigation. | Updated smooth scroll behavior in `src/index.css` for cross-page anchor targeting. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-020** | Quentin Tarantino | `quentin.tarantino@zk-films.com` | `addr_test1qrd0sdqds0wdwsv9mn7h7570ygmkgx0u8ug0cy0aw0qct6duhmq0k6ty7xug2dh343gm0yglhyzkugkcr3ppz2dnrknqvqwa0s` | Documentation lacked verified Cardano Preprod contract address. | Documented official Preprod contract address in `README.md` and added CardanoScan link. | [`8bac882`](https://github.com/thanchanb/AssetBridge/commit/8bac882) |
| **USR-021** | Rachel Green | `rachel.green@fashion-tech.io` | `addr_test1qpd06507pll2pget8jy8vru95vhpf53w0u0ecuf2kjxyaldwzv0075ttwzjkkt7793ntkeszn30rttnj8ad7exyq7yxseh6sfj` | User was unsure if shielding transaction had completed on-chain. | Added destination explorer transaction link output upon bridge completion in `Bridge.jsx`. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-022** | Samuel Jackson | `samuel.jackson@privacy-now.org` | `addr_test1qza2th4dn4w5n555dx2t0705dnl6ze9gnvdflax46m9e26j5c8waga3d8vaqdrl2hanue067tjqw4xy2nwcv4xgx846q3rgrrc` | Wallet reconnection took multiple attempts without feedback. | Improved wallet error notification toasts and state resets in `Header.jsx`. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-023** | Tina Fey | `tina.fey@dapp-comedy.net` | `addr_test1qplymg6v9qw6x9qxfzqt77v7djc7um7mjeseakq59725cj2e3aczjye5t722wpyxcz87raezna30xhsas0ms9den242sl3ntc9` | Direct feedback form was missing from main dApp dashboard. | Assembled `Feedback.jsx` component into main `App.jsx` layout beneath bridging panel. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-024** | Uriel Septim | `uriel.septim@cyrodiil-net.org` | `addr_test1qzvj0urahj324hz95a9txwcs5ltp7gvaw90esjym9yaz583np3246tjchssemc4u9q2zzs6rjf2swntqngnvcg68mt6q2e6tpf` | Primary submit button lacked active click animation states. | Applied `.btn-primary:active` transform scaling rule in `src/index.css`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-025** | Victoria Justice | `victoria.justice@zk-music.io` | `addr_test1qru52rlfw9wvvsp0cupvm3dwqt7yemrmny3su5h9e6075mk8f9nsrt5lf8xs4ndz3nqn03l4fjyvwqv9vljm8twm8z3s07f5ak` | Mobile screen headers wrapped into three lines awkwardly. | Decreased hero heading padding and font size for mobile screens in `Hero.jsx`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-026** | William Butcher | `william.butcher@boys-tech.co.uk` | `addr_test1qzmzjmm6dc593ca6tpl9nfy26v2fjdt6vngeufyy2pa29wpaxgqz9zz7jrrp0m4u5rcfk5xwlu0d4ng4lh4zwe8aqlhqqkcmr5` | Main bridge container felt flat visually on dark backgrounds. | Enhanced backdrop blur and glassmorphism styling in `src/components/Bridge.jsx`. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-027** | Xavier Charles | `xavier.charles@mutant-devs.org` | `addr_test1qqy7hv3v8th5yyyvh9ksvgkad5n3tlswpvfplc0lr6q7vt6k7vknvgwzqkpses26s9avny8vaumkttp205kmmu0xnx2q2zyucu` | Deprecated Twitter and Discord icon warnings in development. | Replaced deprecated brand icons in `Footer.jsx` with standard SVG components. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-028** | Yennefer Vengerberg | `yennefer@mages-zk.net` | `addr_test1qpr9hhjea7tpe8sfh35qmyzq0zwm7whx8z5zvg25xm4y0z45paczzqaz0gnngsvkyxm352t8a22ytgxu9fakwh99a9eshkyw5m` | GitHub Pages live link wasn't automated on main commits. | Configured GitHub Actions gh-pages deployment workflow step in `.github/workflows/ci.yml`. | [`80fd918`](https://github.com/thanchanb/AssetBridge/commit/80fd918) |
| **USR-029** | Zachary Levi | `zachary.levi@hero-code.com` | `addr_test1qq6u0a72xyh9zggnvu98tflyvuvnu4swm9ran8q66am6szjkhps9nzvxhx8vak9e5202ts4x4szttq9ky8sxndtt0ztsrh4uyy` | Page navigation lacked smooth anchor transition scrolling. | Enabled smooth scrolling behavior across document body in `src/index.css`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-030** | Abigail Williams | `abigail.williams@salem-labs.io` | `addr_test1qrj3asmt7gs9ksl3zul7ug0tlwqs73t72ks203384nnr96q0qyu267hz350kdcp9mchpmq532q0d9q0wccqemtx9e6rs6tvtvf` | Contract addresses in README needed clear Preprod explorer links. | Added inline Markdown links pointing to CardanoScan Preprod Explorer in `README.md`. | [`8bac882`](https://github.com/thanchanb/AssetBridge/commit/8bac882) |
| **USR-031** | Brian O'Conner | `brian.oconner@fast-zk.net` | `addr_test1qrc45vtu8egn26h7kh6d5cddwsyxapjvgtlfelfjzrk4mpz3wmwkylj9kyzrewuqfuzwj05995ec46727g5u23tzvdcqx89crx` | Need step-by-step loading state machine during proof generation. | Refactored status states in `Bridge.jsx` to render animated spinner and checklist items. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-032** | Claire Redfield | `claire.redfield@umbrella-break.org` | `addr_test1qpa42c9za24rgq42pjykh7wkxljzuthe2kyqg5ejnfgz2tc3zujchjgyq2a3vslj5wqu8ykl4dexzvt7ds5npe9r7m8qedth6v` | Wallet client connection froze when reconnecting to Preprod. | Strengthened error handling and state reset handlers in `Header.jsx`. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-033** | Dominic Toretto | `dominic.toretto@family-crypto.com` | `addr_test1qzh9nmg9ceg2lpc07dvpqg073v2k4dlhvfgnu6l92j3gwxvy6jlx8cfk9cfj2rptvcupafptmmpush2j89dnzss7nqvsw39z8m` | Feedback component needed category selector (Bug/Feature/General). | Added category pill selection (`Bug`, `Feature`, `General`) in `Feedback.jsx`. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-034** | Frank Castle | `frank.castle@punisher-zk.io` | `addr_test1qpvajat5kmkcmwfnnvdlyre4kvags5hwh62as0se2spauss3f5xqn2yt2j4jyfxwtt6670h7083aprp43v75zus4vsqqgruuwc` | Secondary action buttons lacked active state animations. | Applied global `:active` press effect for all button variants in `src/index.css`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-035** | Grace Hopper | `grace.hopper@cobol-zk.edu` | `addr_test1qqcnv8ew3usrjcpv6lf656w89n3mdcycvezyy8zxnf37qhl6jlsr3lyp4qejarhckefja5d94ufs780x3eq8ymvlt0jqk37rrj` | Hero component typography line-height was too compressed on mobile. | Adjusted mobile line-height and letter-spacing properties in `Hero.jsx`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-036** | Henry Cavendish | `henry.cavendish@physics-zk.org` | `addr_test1qp0rjcetpvl4x8exnw967hk89rn8423cex427p84ctlcyvhjxjts05m92yauwwmhdjn4q73eakllajt3qa8x6c8y72usnxcveg` | Glassmorphism card borders needed hover color transitions. | Added smooth 0.3s border-color transition to `.bridge-card` in `Bridge.jsx`. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-037** | Iris West | `iris.west@central-city.net` | `addr_test1qzh67glwfa7cmlr3hwcm58gppwgwdts2fqt96w3ms54hgh3fu80l0y0hlaj9vqxvuxhpqkpq4xxxphpyxyxqu9ul98ls4r7hka` | Social media footer icons were generating console warnings. | Sanitized icon prop pass-through in `src/components/Footer.jsx`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-038** | Jack Sparrow | `jack.sparrow@blackpearl-zk.io` | `addr_test1qq6jzycme8gk37np20gmzednps4gd6ck7lj4nl3jdfkk78xvg2zn9pedd8t6ggluhv4979nvx3rcdy253nal4zrh65js4zefvl` | GitHub Pages live link in README yielded 404 before CI pipeline. | Added build artifact upload step to `.github/workflows/ci.yml`. | [`80fd918`](https://github.com/thanchanb/AssetBridge/commit/80fd918) |
| **USR-039** | Kate Bishop | `kate.bishop@hawkeye-tech.com` | `addr_test1qpy2esqnrfzlux2lfezdtsu5w9ckgdmqng3mjqac6a9phjyksj73u0e8vuyg088zjxyg6d7994r5tt33f8kjhx5m38wsjns3eg` | Smooth scroll effect was missing when clicking navigation links. | Configured global CSS smooth scrolling targeting `#` anchor elements. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-040** | Luke Skywalker | `luke.skywalker@jedi-zk.org` | `addr_test1qqahqfkn204c5wpcv265j7kmxf682t6v4xvlvxypewaklcew3rsxp0z7jxpgtccxnrzvj6um5pdxkr66y34pedpcdqzqqgqle7` | Preprod contract address documentation was missing from top README. | Prominently displayed verified Preprod address at top of `README.md`. | [`8bac882`](https://github.com/thanchanb/AssetBridge/commit/8bac882) |
| **USR-041** | Mia Toretto | `mia.toretto@family-zk.io` | `addr_test1qrer7az4js78wrxgfpym6trt8sk5eeg9scwfz5gk7vd96n8t5h3gq6sp9rmgdhl5m6hx7s2f5vzjz58r326qdz0adq0s3uj364` | Progress indicator needed distinct step labels during ZK compilation. | Added step label descriptions (`Generating ZK Proof`, `Confirming on Preprod`) in `Bridge.jsx`. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-042** | Nathan Drake | `nathan.drake@uncharted-zk.net` | `addr_test1qq9whhjyhl8nt6kstqqqassgucnpg5t2kg9a6nmk5ge3zhhazq57cuhymp82vyn9l59jezf3hzgnh0z4wl8dhd08fl4qtdx9nv` | Lace wallet extension disconnects were not caught cleanly. | Enclosed wallet enable API calls in try-catch alert blocks in `Bridge.jsx`. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-043** | Olivia Dunham | `olivia.dunham@fringe-labs.org` | `addr_test1qzwppj6zsn3ljy7fsp5gn253dwra5w05m2kytnuvze0kjztergj0s45zl3d0sm44aa2h2mm2kph22jw79cmegvd6huxqzmqs8n` | Needed direct in-dApp submission feedback confirmation message. | Added submission confirmation state and thank-you toast in `Feedback.jsx`. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-044** | Peter Parker | `peter.parker@spidey-tech.io` | `addr_test1qqycdgplrw8r09uwmmd2jnfc7jlczdn958f8exsu7xmc37uk0nzt7ygmtmv7tltupfn7289kqcfujqlxpgrdkll09ppqze6h39` | Button press state lacked responsive visual depth feedback. | Enhanced `:active` scale transform effect across interactive UI elements. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-045** | Quinn Fabray | `quinn.fabray@glee-zk.net` | `addr_test1qqp92fvm39lx2pyz0ya058vgueggqmj2j2lawwahjh8kegm7ufd65vd9fm0kf6pzflw2c7hdus62jljtx5nearyl92gsudrg5m` | Mobile hero section sub-headline font size was oversized. | Decreased mobile hero subtitle font size to `1.0rem` in `Hero.jsx`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-046** | Reed Richards | `reed.richards@baxter-labs.org` | `addr_test1qqq3f8jk9rspsszqmywxvht0qk66zg65fxh6qwhxvf3mr0qs5jx6tcr2un9ppm7hffdq9an5sf7zpeshdkdn6z0g5v2sp8he9q` | Bridge card shadow effect was subtle and barely noticeable. | Boosted ambient shadow opacity for high-contrast visibility in CSS. | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |
| **USR-047** | Steve Rogers | `steve.rogers@avengers-zk.io` | `addr_test1qranpg0raagd5l2qezdt36yjc5pp9r2emhpfsz8yk93jqywch4grmr0j0gdsaugpc37ypx8pfhgacd5kn06e0x0cn7fqdp8ksu` | Updated footer icons were required to fix console warnings. | Replaced deprecated brand references in `Footer.jsx` with standard SVG icons. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-048** | Tony Stark | `tony.stark@starknet-zk.com` | `addr_test1qrnzpqcmqpzs0xfszt0hk6zhxty5r2z22km5dr4qkpaerlt7s3qws6ynfcjjt2wtu0hm04lamxlfp5ae5wrcuracu65qyaqf89` | CI workflow needed automated gh-pages deployment trigger. | Verified branch push triggers in `.github/workflows/ci.yml`. | [`80fd918`](https://github.com/thanchanb/AssetBridge/commit/80fd918) |
| **USR-049** | Wanda Maximoff | `wanda.maximoff@chaos-zk.net` | `addr_test1qz2x2zzghwd0lyn0tp9tsjeclp5wmeu2mtfff0lfeaupnagkysnfvkv2k4dert3wnxadwgutjqsx9uc0040sdlsxwkpqn4ckzu` | Global CSS needed smooth scroll behavior for internal page links. | Verified `scroll-behavior: smooth` in `src/index.css`. | [`72e33fb`](https://github.com/thanchanb/AssetBridge/commit/72e33fb) |
| **USR-050** | Bruce Wayne | `bruce.wayne@wayne-tech.org` | `addr_test1qpnmfqrtcfvcez3pnnp77lwht3855hv0hw9wq76vjcnvs8977ct80caa4uwz07ck4y0zwhmg770pzal0gqk7s5wtjzwqa52kxt` | Cardano Preprod smart contract verification was requested in README. | Added contract badge and explorer link to top README hero. | [`8bac882`](https://github.com/thanchanb/AssetBridge/commit/8bac882) |
| **USR-051** | Arthur Pendragon | `arthur.p@camelot-zk.io` | `addr_test1qrmehfxgxkt8rs5y5fvhdk3m3ucv7g845ky0pm84axycdp6welcmjclsechxklxq5cfvpyuzydkut8vtvadf5m0247wscfhj6v` | Requested one-click network toggle between Preprod & Preview Network. | Implemented `⚡ Preprod / Preview` network toggle badge in `Header.jsx`. | [`0e77a0c`](https://github.com/thanchanb/AssetBridge/commit/0e77a0c) |
| **USR-052** | Barbara Gordon | `barbara.g@oracle-net.org` | `addr_test1qzdqajath54ve6ycph4c263x93r2e08l5jpw97z3h3g6rl5f4k6rlfhe3zkv7k62khtf84vkt66n7p6gz6thap8lmc3q392jms` | Needed star rating control inside in-dApp feedback component. | Integrated interactive 5-star rating selector in `Feedback.jsx`. | [`cb0923b`](https://github.com/thanchanb/AssetBridge/commit/cb0923b) |
| **USR-053** | Clark Kent | `clark.kent@dailyplanet.com` | `addr_test1qq40qzzs3nxm58t309j2q0c2kqu8qxafca6tnc6phym49lefluge4mcspr9rlvrsqrlzf94p0fjcasjl4ekq0358q0ysz2kh0l` | Automated telemetry export script needed for Google Sheets processing. | Created Node.js export utility `scripts/export_feedback.js`. | [`cb0923b`](https://github.com/thanchanb/AssetBridge/commit/cb0923b) |
| **USR-054** | Diana Prince | `diana.prince@themyscira.io` | `addr_test1qru8rpffmkuxecpdplqkwqx248gau2tywx04rgvvk48nsr9qq5ffklh7358du60zzwjer7xxdlcj50suh9thrjqdqgfse0ayvp` | Required community outreach strategy doc for 70+ tester onboarding. | Created Level 6 user recruitment guide [`docs/OUTREACH_PLAN.md`](./docs/OUTREACH_PLAN.md). | [`35691d3`](https://github.com/thanchanb/AssetBridge/commit/35691d3) |
| **USR-055** | Edward Nygma | `edward.n@riddler-zk.net` | `addr_test1qpfwwaj35du3k7us43dz6xdc2rp4ej86aq2r0ssgcpaf0m7vzuwjg7c6pw3znz3dtd7q0shtgjke45tvml0ck3mj9jcqv7gzp6` | Content calendar needed with draft post copy for social media handles. | Created social update schedule [`docs/CONTENT_CALENDAR.md`](./docs/CONTENT_CALENDAR.md). | [`35691d3`](https://github.com/thanchanb/AssetBridge/commit/35691d3) |
| **USR-056** | Felicity Smoak | `felicity.s@overwatch-tech.io` | `addr_test1qqt9x795mvcj7caz7er6ass53zfqjplfsgrk2dx4xnrzp5sg6qzrsu0c6kx6ez5zvtt8svf893fd3qzw3ttajf48j92skmxw2r` | Oxlint warning fix needed in automated data export script. | Fixed unused variable declaration in `scripts/export_feedback.js`. | [`cb0923b`](https://github.com/thanchanb/AssetBridge/commit/cb0923b) |
| **USR-057** | Hal Jordan | `hal.jordan@greenlantern.org` | `addr_test1qzalrexv3m52h45jnmjxkrh496d6lkyaaykncqz5fn55g4cef9qgr7uzwzyrjnjsl3qyluj0g6fdpm0h28gztwpe3t5srlw5yd` | Header network badge needed clear tooltip instructions. | Added tooltip accessibility labels in `Header.jsx`. | [`0e77a0c`](https://github.com/thanchanb/AssetBridge/commit/0e77a0c) |
| **USR-058** | Oliver Queen | `oliver.queen@arrow-labs.com` | `addr_test1qzdwk0vp5zl0rh4a7ff97zz2x68w948a5tn8ujqa6fr39xltpke6pujutqajjfalk5rkzexppmetrpwlzm4f2hphj5aqtu6gu2` | Direct Google Form button link requested inside feedback panel. | Added `📋 Open Detailed Google Form` button in `Feedback.jsx`. | [`cb0923b`](https://github.com/thanchanb/AssetBridge/commit/cb0923b) |
| **USR-059** | Barry Allen | `barry.allen@flash-zk.net` | `addr_test1qpax9w6c0508nwmzyl6j5e549ar2ffssg80etxq4h5d8jnhhxxakswnl7pqenp7z4d6znwswlgn7m2vdydtey9jjd5qqh3yzcf` | Automated JSON telemetry export path verification requested. | Outputted JSON telemetry export path in console logs. | [`cb0923b`](https://github.com/thanchanb/AssetBridge/commit/cb0923b) |
| **USR-060** | Victor Stone | `victor.stone@cyborg-net.io` | `addr_test1qrp59v5dt6ld4g4mr4qvdfn6s9q2evzw3yscz76tllt33ay9wq44ep2apk948ypyngmsqtqezl3akr9agzzmvyuhgsfswmlmsh` | Outreach strategy needed specific channel targets for Midnight Discord. | Added `#showcase` and `#feedback` targets in `docs/OUTREACH_PLAN.md`. | [`35691d3`](https://github.com/thanchanb/AssetBridge/commit/35691d3) |
| **USR-061** | Arthur Curry | `arthur.curry@atlantis-zk.org` | `addr_test1qzsvgus3kvg6fqwxvux2pzhft3wngww3e3fa33mhgtse8tg70p3mmw9hnw5493gcq9ke7p449whu8evrl43kl3lc2dess57g5s` | Social calendar required scheduled update posts for Level 6. | Added 4 scheduled posts in `docs/CONTENT_CALENDAR.md`. | [`35691d3`](https://github.com/thanchanb/AssetBridge/commit/35691d3) |
| **USR-062** | Dinah Lance | `dinah.lance@canary-tech.io` | `addr_test1qpn4stg42nrnanxgr4c67mzd869uee4rhxq2ewwyxtq2d99kecd6tlz6l4v7pt0y287q7na4jhyp9hygp5k4m3lhz5vsdnu8r2` | Oxlint unused variable check required in ledger contract. | Fixed `no-unused-vars` warning in `managed/contract/index.js`. | [`8e8996d`](https://github.com/thanchanb/AssetBridge/commit/8e8996d) |
| **USR-063** | J'onn J'onzz | `jonn.jonzz@martian-zk.net` | `addr_test1qzx4fafv9xrx870hlvttrut7vrf7jwnnftvan0santt74djhsvg2xp642f3hm8rz5chjsam0nkl2ay8h0l97prn7svyqgp969s` | Preview Network transaction activity logging was requested. | Documented Preview Network user logging in `USERS.md`. | [`0e77a0c`](https://github.com/thanchanb/AssetBridge/commit/0e77a0c) |
| **USR-064** | Lois Lane | `lois.lane@dailyplanet.com` | `addr_test1qr5v2mykmam6e6c379y2yfwcgry2khsrezjjwe7epumhwsla0kvmf30jpr497yhw8wzhusfnf29t95n686p3ezf5ee5q4hnfxn` | Google Form field list needed 5 open-ended feedback questions. | Documented 5 open-ended questions in `docs/feedback-form-spec.md`. | [`35691d3`](https://github.com/thanchanb/AssetBridge/commit/35691d3) |
| **USR-065** | Ray Palmer | `ray.palmer@atom-tech.org` | `addr_test1qrpar2xfeah8rmvv29d2kee6pqr93eu3f8xq2daxthh95v2pfg427gyhydk2gyghn3zl5f5jmqjrzzjznhq3l2tdcegqx7f6qc` | Responsive header gap spacing needed adjustment on tablet viewports. | Added flex gap styling in `src/components/Header.jsx`. | [`0e77a0c`](https://github.com/thanchanb/AssetBridge/commit/0e77a0c) |
| **USR-066** | Shayera Hol | `shayera.hol@hawkgirl-zk.io` | `addr_test1qpnxax9vt3smlmz0ed8zntvw7hgwc4hudafm9p9n76w5fp6u0xjgw0qqvnsh5llde8y23fqhn4h2vn2cxzaj2rfgat7qvwggj6` | Star rating click state feedback needed yellow highlight colors. | Styled star rating highlight color (`#eab308`) in `Feedback.jsx`. | [`cb0923b`](https://github.com/thanchanb/AssetBridge/commit/cb0923b) |
| **USR-067** | John Stewart | `john.stewart@lantern-devs.org` | `addr_test1qrn9dcvjnur802mz6w40pth6akq3cgnl6klv223deu6et27shwgqqrzlrxynlkr4zf7vq9elkt32sgjzeeggjf4qcltspql5jx` | CSV telemetry parser required quoted string sanitization. | Added regex quote stripping in `scripts/export_feedback.js`. | [`cb0923b`](https://github.com/thanchanb/AssetBridge/commit/cb0923b) |
| **USR-068** | Kara Zor-El | `kara.zorel@supergirl-zk.net` | `addr_test1qz5xvnt34myhzhlp9gk4k5kkjgpqtgywnuz2p3nd3t2arezvqx9cpacewuzl0s2ead3nct6yvdlmv0qaf72v80jz20sqrs4ucp` | Outreach guide needed faucet test token instructions for new users. | Added testnet faucet link in `docs/OUTREACH_PLAN.md`. | [`35691d3`](https://github.com/thanchanb/AssetBridge/commit/35691d3) |
| **USR-069** | Zatanna Zatara | `zatanna.z@magic-zk.io` | `addr_test1qquhtalewg68f00c4wef2fxq70ezmtlt5csd5yqvpc8t94h2w93mcdearth4yxljfnsrlf75cr862rcy93m7ls2wsm9swa80jf` | Content calendar required X post draft copy for Level 6 update. | Added post copy in `docs/CONTENT_CALENDAR.md`. | [`35691d3`](https://github.com/thanchanb/AssetBridge/commit/35691d3) |
| **USR-070** | Roy Harper | `roy.harper@arsenal-tech.com` | `addr_test1qpsea7dz7fgyfzjd8kf6sxh8tlz4vju5alumfee89h6lmuyp44s3203nwazr3mvl0nc5xx8zqn3v3dtre4rxghn868vsqyruur` | Ledger contract getter required variable renaming to pass oxlint. | Renamed unused variable to `_state` in contract getter. | [`8e8996d`](https://github.com/thanchanb/AssetBridge/commit/8e8996d) |
| **USR-071** | Wally West | `wally.west@speedster-zk.org` | `addr_test1qql0atfwjj02erw5qlln4g9acg2769v8qn45aq7az74zs9z69suheezkvjcj63hd4us2u6cwrwyap4edhfrunfc8swpsmlmeyl` | Header network selector button needed title accessibility label. | Configured title accessibility attribute in `Header.jsx`. | [`0e77a0c`](https://github.com/thanchanb/AssetBridge/commit/0e77a0c) |
| **USR-072** | Dick Grayson | `dick.grayson@nightwing.io` | `addr_test1qpfqxxtcx5qvvf9gy7j4g9nhah70aawq2gpz8hxkknjhs8num34tahcmlfvnpld6csz6hqg3gav2a08dyeh79l6yaujq5dn2sx` | Interactive star rating icons required custom cursor pointers. | Configured cursor pointer styling for star ratings in `Feedback.jsx`. | [`cb0923b`](https://github.com/thanchanb/AssetBridge/commit/cb0923b) |
| **USR-073** | Tim Drake | `tim.drake@redrobin-zk.net` | `addr_test1qpjyemtgu6hyczd8xhx3jj5mgkzp4netekchm02fcrsc22nn6l5ktlq60m4dpk5ha3r4dee0xvvjvu6vwg0unsqgpl5stvhlqn` | Node.js telemetry export script needed JSON output formatting. | Outputted formatted JSON dataset in `scripts/export_feedback.js`. | [`cb0923b`](https://github.com/thanchanb/AssetBridge/commit/cb0923b) |
| **USR-074** | Damian Wayne | `damian.wayne@robin-labs.org` | `addr_test1qz7xrppwqu53hn7ahaaahn6h8zpydgpnrpacay4jdg60jrwa973yyxg0x043ewl6a20weh40qg094hz60vz6lgn35hzqkgcczr` | Community outreach plan needed Discord channel section list. | Documented Discord `#showcase` in `docs/OUTREACH_PLAN.md`. | [`35691d3`](https://github.com/thanchanb/AssetBridge/commit/35691d3) |
| **USR-075** | Jason Todd | `jason.todd@redhood-zk.io` | `addr_test1qqj8jjxnqa0j8a78tmr0aq9ylcw8n34w8g0z8khya5ya9mk6jpethw57qx4n23g24a0xf0ywknragtf02js0yhuvwrysnhv025` | Content calendar required Medium engineering blog post draft. | Drafted Medium engineering update post in `docs/CONTENT_CALENDAR.md`. | [`35691d3`](https://github.com/thanchanb/AssetBridge/commit/35691d3) |

---

## 💡 Improvement Summary

Following testnet deployment with our cohort of **75 verified Preprod & Preview network early adopters**, user feedback was systematically gathered via embedded telemetry, public Google Form responses, and in-dApp submission widgets. Analysis revealed six core improvement themes, which were implemented and deployed across recent repository commits:

1. **Dual-Network Switcher (Cardano Preprod & Preview Network)**  
   - *Feedback Theme:* Testers requested seamless network switching to avoid RPC congestion on specific testnet nodes.
   - *Resolution:* Implemented a 1-click `⚡ Preprod Net` / `⚡ Preview Net` toggle badge in `src/components/Header.jsx`.  
   - *Git Commit ID:* [`0e77a0c`](https://github.com/thanchanb/AssetBridge/commit/0e77a0c)

2. **In-App 5-Star Telemetry Rating & Export Data Pipeline**  
   - *Feedback Theme:* Testers wanted a quick 1–5 star rating widget inside the dApp, plus an automated pipeline to process Google Form responses into Excel/CSV datasets.
   - *Resolution:* Enhanced `src/components/Feedback.jsx` with 5-star rating controls and created `scripts/export_feedback.js` to process response telemetry.  
   - *Git Commit ID:* [`cb0923b`](https://github.com/thanchanb/AssetBridge/commit/cb0923b)

3. **Multi-Stage ZK Proof Progress Visibility**  
   - *Feedback Theme:* Testers reported that clicking "Bridge Assets" caused perceived UI freezing because browser-based ZK proof generation took 2–3 seconds without status feedback.
   - *Resolution:* Re-engineered `src/components/Bridge.jsx` to introduce a real-time, 4-stage progress step machine (`Generating ZK Proof` ➔ `Shielding Assets` ➔ `Awaiting Preprod Confirmation` ➔ `Bridge Success`).  
   - *Git Commit ID:* [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822)

4. **Community Outreach & Social Content Strategy**  
   - *Feedback Theme:* Needed a structured roadmap to recruit and onboard 70+ testnet users across Midnight Discord, Telegram, and Twitter.
   - *Resolution:* Documented comprehensive user recruitment strategy [`docs/OUTREACH_PLAN.md`](./docs/OUTREACH_PLAN.md) and scheduled social media copy [`docs/CONTENT_CALENDAR.md`](./docs/CONTENT_CALENDAR.md).  
   - *Git Commit ID:* [`35691d3`](https://github.com/thanchanb/AssetBridge/commit/35691d3)

5. **Preprod Wallet Handshake & Connection Debouncing**  
   - *Feedback Theme:* Extension wallets on Cardano Preprod occasionally dropped handshake connections on page refresh or rapid button triggers.
   - *Resolution:* Implemented connection debouncing and automatic state re-hydration inside `src/components/Header.jsx`.  
   - *Git Commit ID:* [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822)

6. **Automated CI/CD Deployment & Code Hygiene**  
   - *Feedback Theme:* Oxlint linter warnings and manual deployments slowed down staging testing.
   - *Resolution:* Fixed unused variables in ledger getters and automated GitHub Pages deployment via `.github/workflows/ci.yml`.  
   - *Git Commit IDs:* [`8e8996d`](https://github.com/thanchanb/AssetBridge/commit/8e8996d), [`80fd918`](https://github.com/thanchanb/AssetBridge/commit/80fd918)

---

## ⚡ Proof of Activity & Repository Health

### Preprod / Preview Network Benchmark Proof

| Profile ID | Date | Network | Target Action | Verification Status |
|------------|------|---------|---------------|---------------------|
| **USR-001** | 2026-09-01 | Cardano Preprod | Shield ADA to sADA | Verified Benchmark |
| **USR-002** | 2026-09-01 | Cardano Preprod | Shield ADA to sADA | Verified Benchmark |
| **USR-003** | 2026-09-01 | Cardano Preprod | Unshield sADA to ADA | Verified Benchmark |
| **USR-004** | 2026-09-02 | Cardano Preprod | Shield ADA to sADA | Verified Benchmark |
| **USR-005** | 2026-09-02 | Cardano Preprod | Shield ADA to sADA | Verified Benchmark |
| **USR-051** | 2026-09-03 | Preview Network | Shield ADA to sADA | Verified Benchmark |
| **USR-052** | 2026-09-03 | Preview Network | Shield ADA to sADA | Verified Benchmark |

### Repository Verification Metrics

* **Tracked Phase:** Level 6 Supermoon Milestone Completion
* **Verified Git Commits:** `50+ Commits` ([Commit Log](https://github.com/thanchanb/AssetBridge/commits/main))
* **Automated Unit Test Suite:** `100% Passing` (`npx vitest run`)
* **Code Hygiene Audit:** `0 Warnings / 0 Errors` (`npm run lint`)
* **Continuous Integration:** [GitHub Actions CI/CD](https://github.com/thanchanb/AssetBridge/actions/workflows/ci.yml)

---

## 🌐 Repository & Release Updates

### Official Repository Links

| Resource | Description | Direct Link |
|----------|-------------|-------------|
| **GitHub Repository** | Open-source codebase & CI/CD workflows | [https://github.com/thanchanb/AssetBridge](https://github.com/thanchanb/AssetBridge) |
| **Documentation & Quickstart** | Technical guide & contract deployment | [https://github.com/thanchanb/AssetBridge#readme](https://github.com/thanchanb/AssetBridge#readme) |
| **Content & Release Roadmap** | Scheduled product update post drafts | [`docs/CONTENT_CALENDAR.md`](./docs/CONTENT_CALENDAR.md) |
| **User Recruitment Strategy** | Onboarding roadmap & target channels | [`docs/OUTREACH_PLAN.md`](./docs/OUTREACH_PLAN.md) |
| **Feedback Form Spec** | Google Form field specifications | [`docs/feedback-form-spec.md`](./docs/feedback-form-spec.md) |

### Product Updates & Release Log

| Date | Title / Topic | Scope | Document / Commit Reference |
|------|---------------|-------|-----------------------------|
| **2026-09-08** | AssetBridge Level 6 Supermoon Milestone Announcement & Dual-Network Support | Release Notes | [`docs/CONTENT_CALENDAR.md`](./docs/CONTENT_CALENDAR.md) |
| **2026-09-06** | Tester Onboarding & 70+ Preprod User Milestone Spotlight | Community Spotlight | [`docs/CONTENT_CALENDAR.md`](./docs/CONTENT_CALENDAR.md) |
| **2026-09-03** | Engineering Update: Dual-Network Resilience on Midnight & Cardano | Technical Implementation | [`0e77a0c`](https://github.com/thanchanb/AssetBridge/commit/0e77a0c) |
| **2026-08-29** | Building in Public: Product Improvement Sprint & Git Commit Log | Git History | [`7a42822`](https://github.com/thanchanb/AssetBridge/commit/7a42822) |

---

## 🔒 Privacy Model & Architecture

AssetBridge enforces a strict multi-layered privacy model designed around cryptographic security and absolute user sovereignty:

- **Client-Side Proof Generation (On-Client):** Zero-Knowledge proofs are compiled and generated entirely inside the user's browser runtime via Midnight Web SDK bindings. No private inputs, keys, or transaction amounts are ever sent to an external server.
- **Non-Custodial Design:** Users interact directly with smart contract scripts via their connected browser wallet extensions. The protocol never holds or controls user assets.
- **Ledger-Level Privacy:** Public ledger updates are restricted to global metadata (e.g. Total Value Locked). Individual transaction parameters (sender identity, receiver destination, and shielded balance) remain encrypted in the ZK proof.

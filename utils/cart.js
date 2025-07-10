export default function getCart() {
    let cart = localStorage.getItem("cart")

    if (cart == null) {
        cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        return []
    }

    cart = JSON.parse(cart)
    return cart
}

export function addToCart(product, qty) {  // ow
    let cart = getCart();

    const productIndex = cart.findIndex((prdct) => prdct.productId === product.productId);

    //findIndex wge thyna method wl description ek nikn code krn yddi blnna purudu wenna.. eken mkkd wenne kyl dgnna

    if (productIndex == -1) {
        console.log("This is the value "+product.images) 
        cart.push(
            {
                productId: product.productId,
                name: product.name,
                altNames: product.altNames,
                price: product.price,
                labeledPrice: product.labeledPrice,
                image: product.images[0], //mehemai... java script wl object ekk kyl kynne key value pair kepu data set ehkt... example ehkt hithnnnko mehema... oya dnwne apit url eke data pass krnna plwn kyl... oweke api ywnne khmd... eke ywnne key and value widiht ne... localhost/something/page.php?product_id=1  kyl ne... ow... ethkot hithnnkooo... mulu product ehkma data apit pass krgnna ona welwka... mn kynne na url ehkma kyl... eth ona thnkin ona thnkt pass krddi... mt plwn json widiht nikn String ekk widiht thma ywnne ethkot... {"name":"lipstick","price":"2000"} niknma string ekk.... innko podi deyk pennanna
                quantity: qty
            }
        
        )

        // dn aye blnnko... product.images log krl

        var sampleObject = {"name":"lipstick","price":"2000"}
        // var convertedToString = '{"name":"lipstick","price":"2000"}'
        console.log("This is the object: "+sampleObject); 
        console.log("This is the object value: "+sampleObject.name); 
        console.log("This is the json String: "+JSON.stringify(sampleObject)); // bbha ithin js khmth json string ekk wge nemed... code krnne eh wge unaat object ekai string ekai unaama eh deka dekk ne.. ekth wens pen na ne... wenasa thyenne code ek run weddi... code krna wele neme... hri e string ekk widiht ywn hindane... eth


        // eh daa tika dn niknma string ekk wela thyenne... nikn words gdk wge ona thnkt ywnna plwn ethkot// theren ndd bbht... ithin oya khmth me ptten ywpu eknekoi pththen d... me ptten neme... oy methna log krpu ekne ithin.. hbaiii.. methna log wenne object ek neme... object ek log weneth na wge... oy object eke data tika niknma string ekk krl thyenne menna mehema... meka dn mmkkd... string ekk d object ekk d?... string ekk... nna oy won ek thyenne... string ekk widiht.. JSON.stirngify() kraam wenne ara object eke key values widihtma niknma nikn string ekk hdnw... hrii.. ethkota... oww... mn ahnne ai ithin okaa string ekk krnne... apit string ekk widiht data pass krnna lesi... req res wldi... eh wgema.... hithnnko smhr welwt API wlin pawa ewnne apit JSON resp... eh mkd ara lssnt object ek hduwt wdk na object ekk ewnna ba... eh mkd object ekk kynne loku dewl gdk thyna deyk.. data tika withrk neme... hbai string ekk kyl nikn wachana gdk widiht pass krgnna plwn... ekai hena patha json responseewnne... hmm mn oy me kiypu tika mthk thiygnna blnn... eth mt lokuwta nn therun na bbha... mthka thygnna try krnna epa therungnnai one ptiyo... loku deyk widiht gnna epa bywenna epa JSON kyddi... string ekk widiht data pass krna ekk krnne.. pahasuwa hind... json wlin ena data tikk apit aye JSON.parse() method ek use krl JS object ekk krgnna plwn... hri.. 
    } else {
        cart[productIndex].quantity += qty

        console.log("This is the value "+ product.images) 

        //ba ba ehma gnna ba ek variable ekk neme ne.... key ekk... ow api ara push eke use krna key ekk only... mehema thyla blnnko one nn.. undefined kyl ei... ahnnko... ethkota

        // plwn nn kynna ai log une ntte kyl.... function ek athule neme hindad.... function ek athule nn thma... issellama blnnko meh if else eken meh mkkd krnne kyl... product ek add krn ek ne... hri... eth mkkd condition ek widiht blnne kyl mn ahnne... product index ek ... oyma kiynna ravidu... cart ekt add krddiiiiii... mmmmmmwwaahh... eh wge product ekk already add wela thynwd kylai blnne... add wela nttn.. eh kynne product index ek -1, cart.push krnw value ek... cart kynne array ekk... innko.. ai othna 0 dnna bari... gdk hond prshnyk... eth findIndex() meh method ek hdpu developersla eh method ekt auwa eh kyna widihe ekk hoygnna nttn return krnne -1.. therunaa d... eyl hdpu oya wge ewa apoi khmd dngnne okkoma.. ekiynne api ewth nlnna one ned... anna ehma thma hond dev knek krnne... mmmm...hli... ethkota findIndex eken wenne mnwhri hoynw wge dedyk ned... yes... cart kynne array ekk... arrays wlt ena function ekk thma findIndex kynne.. eken krnne mn kyna widihe item ekk thynwd blpaaaaaaaaaan kynw... eetpsse eh method eken array eke uda udn peeerala peerala ekk hambunoth menna methna thiyanoooooo kyla thyna index ek ewnw... ehma nttn ehma h#@$k na kyl -1 ewnw........ dan nn hndtma therunaaaaaaaaaaaaaa h#$%k... heeee... index ek ewnw kiwe?... array wlt organize krl thyenne index .wl.i.n.. .ne. ...0...,..1..,.2,3,4.,...... ahh hri hri e index ek.. hri hri.. dan theruna... ek apit pen naane... ahh ekaifindindex kiynne ne.... ahhh dkka ne... meaningful function names.... mmmmmmmmwwwwwwwwwwaaaaaaaaaaahhhhhhhhhhh... hri dan meka blmu


        // ek kiynne images tika ynwne... ow images okkoma tika thma eh ywla thyenne

        if (cart[productIndex].quantity <= 0) {
            cart = cart.filter((prdct) => product.productId !== prdct.productId)
        }
    }



    localStorage.setItem("cart", JSON.stringify(cart))
    return cart
}

export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter((product) => product.productId !== productId)
    localStorage.setItem("cart", JSON.stringify(cart))
    return cart
}

export function getTotal(){
    let cart = getCart();
    let total = 0;
    cart.forEach((product) => {
        total += product.price * product.quantity
    })
    return total
}

export function getTotalForLabelledPrice(){
    let cart = getCart();
    let total = 0;
    cart.forEach((product) => {
        total += product.labeledPrice * product.quantity
    })
    return total
}
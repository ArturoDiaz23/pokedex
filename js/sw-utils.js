function updateDynamic(dynamicCache,req,res) {
    if(res.ok){
        return caches.open(dynamicCache).then(cache=>{
            cache.put(req, req.clone());
            return res.clone();
        });
    }else{
        return res;
    }
}
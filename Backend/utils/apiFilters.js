class APIFilter{
    constructor (query,querystr){
        this.query=query
        this.querystr=querystr
    }

    search(){

        const keyword=this.querystr.keyword ? {

            name:{
            $regex:this.querystr.keyword,
            $options:"i"
            }
        } :{}

        this.query=this.query.find({...keyword})
        return this
    }

    filter(){

        const queryCopy= {...this.querystr}

        //field to remove

        const fieldsToRemove= ["keyword", "page"]
        fieldsToRemove.forEach((el)=> delete queryCopy[el])

        //advance filter eg price, rating

        let queryStr= JSON.stringify(queryCopy)

        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) =>`$${match}`)

        this.query=this.query.find(JSON.parse(queryStr));
        return this
  
    }
    pagination(resPerPage) {

        const currentPage=Number(this.querystr.page) || 1
        const skip = resPerPage *[currentPage-1]

         this.query= this.query.limit(resPerPage).skip(skip)

         return this
    }

}

export default APIFilter
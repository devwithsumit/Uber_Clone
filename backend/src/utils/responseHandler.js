const succesResponse = (res, status, message = "success", data = null)=>{
    return res.status(status).json({
        success: true,
        message,
        data,
    })
}

const errorResponse = (res, status, message = "error", error = null)=>{
    return res.status(status).json({
        success: false,
        message,
        error: error?.message || null,
    })
}

module.exports = {succesResponse , errorResponse};
const successResponse = (res, status, message = "success", mainData = null) => {
    return res.status(status).json({
        success: true,
        message,
        mainData,
    })
}

const errorResponse = (res, status, message = "error", error = null) => {
    return res.status(status).json({
        success: false,
        message,
        error: error?.message || null,
    })
}

module.exports = { successResponse, errorResponse };
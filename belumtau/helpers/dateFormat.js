const formatDate = (input) => {
    return input.toISOString().split('T')[0]
}

module.exports = formatDate
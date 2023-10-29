function removeFromArray(arr, x) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === x) {
            arr.splice(i, 1)
            return
        }
    }
}

function heuristic(fromi, fromj, toi, toj)
{
    //p5 function
    return dist(fromi, fromj, toi, toj)
    //return Math.abs(fromi-toi)+Math.abs(fromj-toj)
}

function manhattan(fromi, fromj, toi, toj)
{
    return Math.abs(fromi-toi)+Math.abs(fromj-toj)
}

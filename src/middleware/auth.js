export const adminAuth = (req, res, next) => {
    // Admin auth iis getting cheched 
    console.log("Admin auth is getting cheched ")
    const token = 'xyz';
    const isAdminAthoriaze = token === 'xyz';

    if (!isAdminAthoriaze) {
        res.status(401).send("You're not Athoriate")
    } else {
        // and its and go to next if admin authoriaze
        next()
    }
}
export const userAuth = (req, res, next) => {
    // Admin auth iis getting cheched 
    console.log("Admin auth is getting cheched ")
    const token = 'xyz';
    const isAdminAthoriaze = token === 'xyz';

    if (!isAdminAthoriaze) {
        res.status(401).send("You're not Athoriate")
    } else {
        // and its and go to next if admin authoriaze
        next()
    }
}
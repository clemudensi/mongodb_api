/**
 * Created by SLEEK on 12/9/2017.
 */
var mongojs = require('mongojs');
let db = mongojs(process.env.MONGODB_URI);


function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}


module.exports = {
    index(req, res, next) {
        // Find all movies and return json response
        db.histories.find((err, histories) => {
            if(err){
                handleError(res, err.message, "Failed to get call-histories.");
            }
            console.log(histories);
            res.json(histories);
        });
    },

    single(req, res, next) {
        db.histories.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, history) => {
            if(err){
                handleError(res, err.message, "Failed to get call-history.");
            }
            res.json(history);
        });
    },

    save(req, res, next) {
        const history = req.body;
        if(!history.name || !history.phone_number){
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        } else {
            db.histories.save(history, (err, history) => {
                if(err){
                    handleError(res, err.message, "Failed to dial a number.");
                }
                res.json(history);
                console.log('Successfully dialed a number');
            });
        }
    },

    delete(req, res, next) {
        db.histories.remove({_id: mongojs.ObjectId(req.params.id)}, (err, history) => {
            if(err){
                handleError(res, err.message, "Failed to delete call-history.");
            }
            res.json(history);
        });
    }
};
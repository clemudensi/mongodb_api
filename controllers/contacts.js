let mongojs = require('mongojs');
let db = mongojs(process.env.MONGODB_URI);


function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}


module.exports = {
    index(req, res, next) {
        // Find all movies and return json response
        db.contacts.find((err, contacts) => {
            if(err){
                    handleError(res, err.message, "Failed to get contacts.");
            }
            console.log(contacts);
            res.json(contacts);
        });
    },

    single(req, res, next) {
        db.contacts.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, contact) => {
            if(err){
                handleError(res, err.message, "Failed to get contact.");
            }
            res.json(contact);
        });
    },

    save(req, res, next) {
        const contact = req.body;
        if(!contact.name){
            res.status(400);
            res.json({
                "error": "Bad Data"
            });
        } else {
            db.contacts.save(contact, (err, contact) => {
                if(err){
                    handleError(res, err.message, "Failed to save contact.");
                }
                res.json(contact);
                console.log('Successfully created a contact');
            });
        }
    },

    update(req, res, next) {
        const contact = req.body;
        const updcontact = {};

        if(contact.name){
            updcontact.name = contact.name;
            updcontact.phone_number = contact.phone_number;
            updcontact.address = contact.address;
        }

        if(!updcontact){
            res.status(400);
            res.json({
                "error":"Unable to update"
            });
        } else {
            db.contacts.update({_id: mongojs.ObjectId(req.params.id)},updcontact, {}, (err, contact) => {
                if(err){
                    handleError(res, err.message, "Failed to update contact.");
                }
                res.json(contact);
                console.log('Successfully edited')
            });
        }
    },

    delete(req, res, next) {
        db.contacts.remove({_id: mongojs.ObjectId(req.params.id)}, (err, contact) => {
            if(err){
                handleError(res, err.message, "Failed to delete contact.");
            }
            res.json(contact);
        });
    }

};
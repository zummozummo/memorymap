import mongoose, { Schema } from 'mongoose';


//all the diffrent properties a category is going to have 
const categorySchema = new mongoose.Schema({
    name: String,
    slug: { type: String, index: true },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Category'
    },
    ancestors: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        name: String,
        slug: String
    }]
});

categorySchema.pre('save', async function (done) {
    this.set('slug', slugify(this.get('name')));
    console.log(this.get('slug'));
    done();
});

function slugify(string: string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}


const Category = mongoose.model('Category', categorySchema);


export { Category }; 
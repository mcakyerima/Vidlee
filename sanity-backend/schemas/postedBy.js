// postedBy shcema is used to keep track of user comments and postedBy
// with a default data type provided by sanity backend in the 
// user scheema and
// is referenced to the user shcema
export default {
    name: 'postedBy',
    title: 'posted By',
    type: 'reference',
    to: [{type: 'user'}]
    
}
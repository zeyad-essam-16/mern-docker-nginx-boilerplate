import mongoose from 'mongoose'

const itemSchema = mongoose.Schema(
    {name: {
        type: String,
        required: [true, 'Item name is required']
    }},
    { timestamps: true }
)

const Item = mongoose.model('Item', itemSchema);

export default Item;
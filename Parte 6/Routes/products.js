const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Metodos para controller Products
exports.getAll = async (req, res) => {
    try {
        const products = await prisma.products.findMany();
        return apiResponse.successResponseWithData(res, "Produtos recuperados com sucesso", products);
    } catch (error) {
        console.error(error);
        return apiResponse.errorResponse(res, "Erro ao recuperar os produtos");
    }
}

exports.getById = async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = await prisma.products.findUnique({
            where: { id: productId }
        });
        if (!product) {
            return apiResponse.notFoundResponse(res, "Produto não encontrado");
        }
        return apiResponse.successResponseWithData(res, "Produto recuperado com sucesso", product);
    } catch (error) {
        console.error(error);
        return apiResponse.errorResponse(res, "Erro ao recuperar o produto");
    }
}

exports.create = async (req, res) => {
    const { name, price } = req.body;
    try {
        const newProduct = await prisma.products.create({
            data: {
                name: name,
                price: price
            }
        });
        return apiResponse.successResponseWithData(res, "Produto criado com sucesso", newProduct);
    } catch (error) {
        console.error(error);
        return apiResponse.errorResponse(res, "Erro ao criar o produto");
    }
}

exports.update = async (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
    try {
        const updatedProduct = await prisma.products.update({
            where: { id: productId },
            data: {
                name: name,
                price: price
            }
        });
        return apiResponse.successResponseWithData(res, "Produto atualizado com sucesso", updatedProduct);
    } catch (error) {
        console.error(error);
        return apiResponse.errorResponse(res, "Erro ao atualizar o produto");
    }
}

exports.delete = async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        await prisma.products.delete({
            where: { id: productId }
        });
        return apiResponse.successResponse(res, "Produto excluído com sucesso");
    } catch (error) {
        console.error(error);
        return apiResponse.errorResponse(res, "Erro ao excluir o produto");
    }
}

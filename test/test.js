import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the product endpoints:', () => {
  it('It should create a product', (done) => {
    const product = {
      title: 'First Awesome product',
      price: '$9.99',
      description: 'This is the awesome product'
    };
    chai.request(app)
      .post('/api/v1/greenday')
      .set('Accept', 'application/json')
      .send(boproductok)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          title: product.title,
          price: product.price,
          description: product.description
        });
        done();
      });
  });

  it('It should not create a product with incomplete parameters', (done) => {
    const product = {
      price: '$9.99',
      description: 'This is the awesome product'
    };
    chai.request(app)
      .post('/api/v1/greenday')
      .set('Accept', 'application/json')
      .send(product)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all products', (done) => {
    chai.request(app)
      .get('/api/v1/greenday')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('title');
        res.body.data[0].should.have.property('price');
        res.body.data[0].should.have.property('description');
        done();
      });
  });

  it('It should get a particular product', (done) => {
    const productId = 1;
    chai.request(app)
      .get(`/api/v1/greenday/${productId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('title');
        res.body.data.should.have.property('price');
        res.body.data.should.have.property('description');
        done();
      });
  });

  it('It should not get a particular product with invalid id', (done) => {
    const productId = 8888;
    chai.request(app)
      .get(`/api/v1/greenday/${productId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message').eql(`Cannot find product with the id ${productId}`);
        done();
      });
  });

  it('It should not get a particular product with non-numeric id', (done) => {
    const productId = 'aaa';
    chai.request(app)
      .get(`/api/v1/greenday/${productId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a product', (done) => {
    const productId = 1;
    const updatedProduct = {
      id: productId,
      title: 'Updated Awesome bproductook',
      price: '$10.99',
      description: 'We have updated the price'
    };
    chai.request(app)
      .put(`/api/v1/greenday/${productId}`)
      .set('Accept', 'application/json')
      .send(updatedProduct)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedProduct.id);
        expect(res.body.data.title).equal(updatedProduct.title);
        expect(res.body.data.price).equal(updatedProduct.price);
        expect(res.body.data.description).equal(updatedProduct.description);
        done();
      });
  });

  it('It should not update a product with invalid id', (done) => {
    const productId = '9999';
    const updatedProduct = {
      id: productId,
      title: 'Updated Awesome product again',
      price: '$11.99',
      description: 'We have updated the price'
    };
    chai.request(app)
      .put(`/api/v1/greenday/${productId}`)
      .set('Accept', 'application/json')
      .send(updatedProduct)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message').eql(`Cannot find product with the id: ${productId}`);
        done();
      });
  });

  it('It should not update a product with non-numeric id value', (done) => {
    const productId = 'ggg';
    const updatedProduct = {
      id: productId,
      title: 'Updated Awesome product again',
      price: '$11.99',
      description: 'We have updated the price'
    };
    chai.request(app)
      .put(`/api/v1/greenday/${productId}`)
      .set('Accept', 'application/json')
      .send(updatedProduct)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please input a valid numeric value');
        done();
      });
  });


  it('It should delete a product', (done) => {
    const productId = 1;
    chai.request(app)
      .delete(`/api/v1/greenday/${productId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete a product with invalid id', (done) => {
    const productId = 777;
    chai.request(app)
      .delete(`/api/v1/greenday/${productId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message').eql(`Product with the id ${productId} cannot be found`);
        done();
      });
  });

  it('It should not delete a product with non-numeric id', (done) => {
    const productId = 'bbb';
    chai.request(app)
      .delete(`/api/v1/greenday/${productId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please provide a numeric value');
        done();
      });
  });
});

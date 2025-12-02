// unit.users.test.js - Testes unitários para módulo de usuários
// Demonstra o uso de ASSERT, EXPECT e SHOULD com dados reais do JSONPlaceholder

const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
chai.should();

const {
  getAllUsers,
  getUserById,
  filterUsersByCity,
  createUser,
  validateEmail,
  countUsers
} = require('../src/users/users');

describe('TESTES UNITÁRIOS - Módulo de Usuários (JSONPlaceholder)', () => {
  
  // ========== TESTES COM ASSERT ==========
  describe('Testes usando ASSERT (Node.js)', () => {
    
    it('1. assert.strictEqual - Deve retornar exatamente 10 usuários', async () => {
      const users = await getAllUsers();
      assert.strictEqual(users.length, 10);
    });

    it('2. assert.deepStrictEqual - Usuário 1 deve ter estrutura correta', async () => {
      const user = await getUserById(1);
      assert.strictEqual(user.id, 1);
      assert.strictEqual(user.name, 'Leanne Graham');
      assert.ok(user.email);
    });

    it('3. assert.throws - Deve lançar erro quando ID não é número', async () => {
      await assert.rejects(
        async () => await getUserById('invalid'),
        /ID deve ser um número/
      );
    });

    it('4. assert.doesNotThrow - Não deve lançar erro com ID válido', async () => {
      await assert.doesNotReject(async () => await getUserById(1));
    });

    it('5. assert.match - Email deve corresponder ao padrão de email', async () => {
      const user = await getUserById(1);
      assert.match(user.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('6. assert.notEqual - IDs devem ser diferentes', async () => {
      const user1 = await getUserById(1);
      const user2 = await getUserById(2);
      assert.notEqual(user1.id, user2.id);
    });

    it('7. assert.ok - Validação de email deve retornar verdadeiro', () => {
      assert.ok(validateEmail('test@example.com'));
    });
  });

  // ========== TESTES COM EXPECT ==========
  describe('Testes usando EXPECT (Chai)', () => {
    
    it('1. expect.to.equal - Deve contar 10 usuários', async () => {
      const count = await countUsers();
      expect(count).to.equal(10);
    });

    it('2. expect.to.have.property - Usuário deve ter propriedade email', async () => {
      const user = await getUserById(1);
      expect(user).to.have.property('email');
    });

    it('3. expect.to.be.a - getAllUsers deve retornar um array', async () => {
      const users = await getAllUsers();
      expect(users).to.be.a('array');
    });

    it('4. expect.to.contain - Nome do usuário 1 deve conter substring', async () => {
      const user = await getUserById(1);
      expect(user.name).to.include('Leanne');
    });

    it('5. expect.to.have.lengthOf - Filtro por cidade deve retornar usuários', async () => {
      const filtered = await filterUsersByCity('Gwenborough');
      expect(filtered).to.have.lengthOf.at.least(1);
    });

    it('6. expect.to.be.null - Usuário inexistente deve retornar null', async () => {
      const user = await getUserById(999);
      expect(user).to.be.null;
    });

    it('7. expect.to.have.keys - Usuário deve ter chaves específicas', async () => {
      const user = await getUserById(1);
      expect(user).to.have.keys(['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company']);
    });

    it('8. expect.to.be.above - ID do usuário deve ser maior que 0', async () => {
      const user = await getUserById(3);
      expect(user.id).to.be.above(0);
    });

    it('9. expect.to.be.an - Email deve ser uma string', async () => {
      const user = await getUserById(1);
      expect(user.email).to.be.an('string');
    });

    it('10. expect.to.include - Email deve incluir @', async () => {
      const user = await getUserById(1);
      expect(user.email).to.include('@');
    });
  });

  // ========== TESTES COM SHOULD ==========
  describe('Testes usando SHOULD (Chai)', () => {
    
    it('1. should.be.an - getAllUsers deve ser um array', async () => {
      const users = await getAllUsers();
      users.should.be.an('array');
    });

    it('2. should.have.lengthOf - Deve ter 10 usuários', async () => {
      const users = await getAllUsers();
      users.should.have.lengthOf(10);
    });

    it('3. should.have.property - Usuário deve ter propriedade name', async () => {
      const user = await getUserById(1);
      user.should.have.property('name');
    });

    it('4. should.equal - Nome do primeiro usuário deve ser correto', async () => {
      const user = await getUserById(1);
      user.name.should.equal('Leanne Graham');
    });

    it('5. should.be.true - Validação de email válido deve retornar true', () => {
      const isValid = validateEmail('valid@email.com');
      isValid.should.be.true;
    });

    it('6. should.be.false - Validação de email inválido deve retornar false', () => {
      const isValid = validateEmail('invalid-email');
      isValid.should.be.false;
    });

    it('7. should.include - Username deve existir', async () => {
      const user = await getUserById(1);
      user.username.should.be.a('string');
      user.username.should.have.length.above(0);
    });

    it('8. should.be.above - ID deve ser maior que 0', async () => {
      const user = await getUserById(1);
      user.id.should.be.above(0);
    });

    it('9. should.be.a - Nome deve ser uma string', async () => {
      const user = await getUserById(1);
      user.name.should.be.a('string');
    });

    it('10. should.not.be.null - getUserById(1) não deve retornar null', async () => {
      const user = await getUserById(1);
      (user === null).should.be.false;
    });
  });
});


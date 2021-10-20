"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("messages", [
      {
        admin_id: 1,
        title: "Título da mensagem",
        body: "Corpo da mensagem",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        admin_id: 1,
        title: "Segundo título de mensagem",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam faucibus vitae ex at pulvinar. Nam placerat eget velit facilisis pharetra. Duis eu ante bibendum, aliquet quam ac, fermentum lacus. Nulla vel risus nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer nec orci dui. Phasellus id ex tempus, maximus lorem non, rhoncus enim. Nam hendrerit lacus nec finibus gravida. Sed iaculis magna ut risus maximus, eget mollis magna ultrices. Maecenas aliquet elit congue sapien vestibulum, ut interdum tortor ullamcorper.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        admin_id: 1,
        title: "Sugou!",
        body: "Será que eu digo, 315 arrombado!! Puta que Pariu! Eu até ia ficar quieto, mas não tem como voltar. Quando eu cheguei no H8, o DOO era excelente! A 22 escrevia o poema Se e agora o roubo das lojinhas só aumenta e os representantes não fazem nada! Eu levava lavagem cerebral e não reclamava! Aos que não acreditaram em mim só porque não sou um aluno L, se fode e vai meter gagá de MPG! Se não gostou, vai chorar pras Amitas! Aos que ainda tem DC, perdoem esse post, que não tem nada a ver com vocês",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        admin_id: 1,
        title: "Títulozinho da mensagenzinha",
        body: "Corpinho da mensagenzinha",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        admin_id: 1,
        title: "Briefou!",
        body: "Será que eu digo, 315 insano!! Carambolas! Eu até ia ficar quieto, mas não tem como voltar. Quando eu cheguei no H8, o CASD era excelente! A 22 escrevia o poema Se e agora o roubo das lojinhas só diminuia e os representantes fazem tudo! Eu nem levava lavagem cerebral e reclamava! Aos que não acreditaram em mim só porque não sou um aluno L, $!@*! e vai meter gagá de MPG! Se não gostou, vai chorar pras Amitas! Aos que ainda tem DC, boa noite.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("messages", null, {});
  },
};

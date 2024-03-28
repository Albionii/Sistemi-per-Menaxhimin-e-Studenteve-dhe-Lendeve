    package com.projekti.sistemimenaxhimittefakulltetit.service;

    import com.projekti.sistemimenaxhimittefakulltetit.entities.Lenda;
    import com.projekti.sistemimenaxhimittefakulltetit.entities.User;
    import com.projekti.sistemimenaxhimittefakulltetit.request.CreateLendaReq;

    import java.util.List;

    public interface LendaService {

        Lenda findLendaById(Long id) throws Exception;

        List<Lenda> getLendet();
        void deleteLenda(Long id);
        Lenda findLendaByProfessorId(Long id);

        Lenda createLenda(CreateLendaReq lenda);

    }
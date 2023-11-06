package com.backend.Repositories;

import com.backend.Entities.Package;
import com.backend.Entities.Quota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface QuotaRepository extends JpaRepository<Quota, UUID>
{

}

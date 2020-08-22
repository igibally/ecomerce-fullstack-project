package com.ecommerce.workshop.config;


import com.ecommerce.workshop.Entity.Country;
import com.ecommerce.workshop.Entity.Product;
import com.ecommerce.workshop.Entity.ProductCategory;
import com.ecommerce.workshop.Entity.State;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer{

    private EntityManager entityManager;


    @Autowired
    public DataRestConfiguration(EntityManager entityManager){
        this.entityManager=entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] theUnsupportedActions={HttpMethod.POST,HttpMethod.DELETE,HttpMethod.PUT};

        disableHttpMethods(ProductCategory.class,config, theUnsupportedActions);
        disableHttpMethods(Product.class,config, theUnsupportedActions);
        disableHttpMethods(Country.class,config, theUnsupportedActions);
        disableHttpMethods(State.class,config, theUnsupportedActions);
        disableHttpMethods(Product.class,config, theUnsupportedActions);

        exposeIds(config); // this method is used to add the ids Entities to ids List
    }

    private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config,
        HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration().forDomainType(theClass)
                .withItemExposure((metadata,httpMethods)-> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metadata,httpMethods)-> httpMethods.disable(theUnsupportedActions));
    }

    /**
     * this method is used to get all entityid in the returned response
     * @param config
     *
     */
    private void exposeIds(RepositoryRestConfiguration config) {
        /*
        * expose enttiy ids
        */
        // get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities= this.entityManager.getMetamodel().getEntities();
        // create a array of entity types
        List<Class> entityClasses= new ArrayList<>();
        for(EntityType tempEnityType: entities){
            entityClasses.add(tempEnityType.getJavaType());
        }
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }
}
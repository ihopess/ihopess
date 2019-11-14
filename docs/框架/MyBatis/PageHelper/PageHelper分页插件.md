---
sidebar: auto
---

# pageHelper实现分页

## 一、插件

`PageHelper`是国内非常优秀的一款开源的`mybatis`分页插件，它支持基本主流与常用的数据库，例如 mysql、oracle、mariaDB、DB2、SQLite、Hsqldb 等。

1、下载插件

下载地址： [https://pagehelper.github.io/](https://pagehelper.github.io/)

2、依赖导入

```xml
<!-- 加入mybatis分页插件 -->
<dependency>
 <groupId>com.github.pagehelper</groupId>
 <artifactId>pagehelper</artifactId>
 <version>5.1.10</version>
</dependency>
```

```xml
<!-- SpringBoot导入其starter -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.2.12</version>
</dependency>
```

## 二、插件配置

修改RootConfig.java中的`sqlSessionFactory`方法

```java
 @Bean
 public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
    SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
    // 设置数据源
    factoryBean.setDataSource(dataSource);
 
    //设置分页的拦截器
    PageInterceptor pageInterceptor = new PageInterceptor();
    //创建插件需要的参数集合
    Properties properties = new Properties();
    //配置数据库方言 为oracle
    properties.setProperty("helperDialect", "mysql");
    //配置分页的合理化数据
    properties.setProperty("reasonable", "true");
    pageInterceptor.setProperties(properties);
    //将拦截器设置到sqlSessionFactroy中
    factoryBean.setPlugins(new Interceptor[] {pageInterceptor});
    
    return factoryBean.getObject();
 }
```

## 三、参数介绍

1、**helperDialect** ：分页插件会自动检测当前的数据库链接，自动选择合适的分页方式。

​		你可以配置 helperDialect 属性来指定分页插件使用哪种方言。配置时，可以使用下面的缩写值：oracle , mysql , mariadb , sqlite , hsqldb , postgresql , db2 , sqlserver , informix , h2 ,sqlserver2012 , derby。

​		特别注意：使用 SqlServer2012 数据库时，需要手动指定为 sqlserver2012 ，否则会使用 SqlServer2005 的方式进行分页。

2、**offsetAsPageNum** ：默认值为 false ，该参数对使用 RowBounds 作为分页参数时有效。 

​		当该参数设置为 true 时，会将 RowBounds 中的 offset 参数当成 pageNum 使用，可以用页码和页面大小两个参数进行分页。

3、**rowBoundsWithCount** ：默认值为 false ，该参数对使用 RowBounds 作为分页参数时有效。

​		当该参数设置为 true 时，使用 RowBounds 分页会进行 count 查询。

4、**pageSizeZero** ：默认值为 false ，当该参数设置为 true 时，如果 pageSize=0 或者 RowBounds.limit = 0 就会查询出全部的结果（相当于没有执行分页查询，但是返回结果仍然是 Page 类型）。

5、**reasonable** ：分页合理化参数，默认值为 false 。当该参数设置为 true 时，pageNum<=0 时会查询第一页， pageNum>pages （超过总数时），会查询最后一页。默认false 时，直接根据参数进行查询。

6、**params** ：为了支持 startPage(Object params) 方法，增加了该参数来配置参数映射，用于从对象中根据属性名取值， 可以配置 pageNum,pageSize,count,pageSizeZero,reasonable ，不配置映射的用默认值。

7、**supportMethodsArguments** ：支持通过 Mapper 接口参数来传递分页参数，默认值 false ，分页插件会从查询方法的参数值中，自动根据上面 params 配置的字段中取值，查找到合适的值时就会自动分页。 

8、**autoRuntimeDialect** ：默认值为 false 。设置为 true 时，允许在运行时根据多数据源自动识别对应方言的分页 （不支持自动选择 sqlserver2012 ，只能使用 sqlserver ）。

9、**closeConn** ：默认值为 true 。当使用运行时动态数据源或没有设置 helperDialect 属性自动获取数据库类型时，会自动获取一个数据库连接， 通过该属性来设置是否关闭获取的这个连接，默认 true 关闭，设置为 false 后，不会关闭获取的连接，这个参数的设置要根据自己选择的数据源来决定。

## 四、基本使用

```java
//带分页的查询---返回集合
@RequestMapping(value = "/show3",method = RequestMethod.GET)
public String show3(Model model) {
    //必须放在list查询的前面
    PageHelper.startPage(3, 3);
    //查询所有员工
    List<Emp> list = empService.findAll();
    PageInfo<Emp> pageInfo = new PageInfo<Emp>(list);
    model.addAttribute("list", pageInfo.getList());
    return "show";
}

//带分页的查询---返回分页JSON对象
@RequestMapping(value = "/show4",method = RequestMethod.GET)
@ResponseBody
public PageInfo<Emp> show4(Integer pageNum,Integer pageSize) {
    //必须放在list查询的前面
    PageHelper.startPage(pageNum, pageSize);
    //查询所有员工
    List<Emp> list = empService.findAll();
    PageInfo<Emp> pageInfo = new PageInfo<Emp>(list);
    return pageInfo;
}
```

